import os
import sys

# Ensure app package is in path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from datetime import datetime, timedelta
from app.database import SessionLocal, Base, engine
import app.models
from app.models.organization import Organization, Ward, Area, Department
from app.models.user import Role, User
from app.models.complaint import ComplaintCategory, Complaint, ComplaintUpdate, ComplaintMedia
from app.models.project import DevelopmentProject, Contractor, ProjectMilestone
from app.models.reward import RewardRule, RewardCatalogue
from app.models.privacy import ConsentType
from app.models.scheme import Scheme
from app.core.security import get_password_hash

def seed():
    # Ensure all tables are created
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # 1. Seed Roles
        roles = [
            ("SUPER_ADMIN", "Full platform-level access"),
            ("ORG_ADMIN", "Municipal corporation/council administrator"),
            ("NAGAR_SEVAK", "Elected ward representative - READ-ONLY oversight"),
            ("STAFF", "Department field technician & worker"),
            ("CITIZEN", "Ward resident citizen")
        ]
        role_map = {}
        for name, desc in roles:
            r = db.query(Role).filter(Role.name == name).first()
            if not r:
                r = Role(name=name, description=desc, is_system_role=True)
                db.add(r)
                db.commit()
                db.refresh(r)
            role_map[name] = r.id

        # 2. Seed Municipal Organizations
        orgs = [
            ("Pune Municipal Corporation", "PMC", "MUNICIPAL_CORP", "Maharashtra", "Pune"),
            ("Brihanmumbai Municipal Corporation", "BMC", "MUNICIPAL_CORP", "Maharashtra", "Mumbai"),
            ("Thane Municipal Corporation", "TMC", "MUNICIPAL_CORP", "Maharashtra", "Thane"),
            ("Nagpur Municipal Corporation", "NMC", "MUNICIPAL_CORP", "Maharashtra", "Nagpur"),
        ]
        org_map = {}
        for name, code, otype, state, dist in orgs:
            o = db.query(Organization).filter(Organization.code == code).first()
            if not o:
                o = Organization(name=name, code=code, org_type=otype, state=state, district=dist, status="ACTIVE")
                db.add(o)
                db.commit()
                db.refresh(o)
            org_map[code] = o.id

        pmc_id = org_map["PMC"]

        # 3. Seed Wards for PMC
        wards = [
            (pmc_id, 14, "Ward 14 (Kothrud North)", "Smt. Sunita More", 62000),
            (pmc_id, 18, "Ward 18 (Bavdhan - Pashan)", "Shri Nitin Kadam", 48000),
            (pmc_id, 22, "Ward 22 (Aundh Central)", "Dr. Archana Shinde", 55000),
            (pmc_id, 10, "Ward 10 (Shivajinagar)", "Shri Mahesh Joshi", 71000),
        ]
        ward_map = {}
        for oid, num, wname, rep, pop in wards:
            w = db.query(Ward).filter(Ward.organization_id == oid, Ward.ward_number == num).first()
            if not w:
                w = Ward(organization_id=oid, ward_number=num, ward_name=wname, representative_name=rep, population=pop)
                db.add(w)
                db.commit()
                db.refresh(w)
            ward_map[num] = w.id

        # 4. Seed Departments
        depts = [
            (pmc_id, "Electrical & Street Lighting", "ELEC"),
            (pmc_id, "Road Infrastructure & Potholes", "ROADS"),
            (pmc_id, "Water Works & Supply", "WATER"),
            (pmc_id, "Drainage & Sewerage", "DRAIN"),
            (pmc_id, "Solid Waste Management", "SWM"),
            (pmc_id, "Public Parks & Environment", "PARKS"),
        ]
        dept_map = {}
        for oid, dname, dcode in depts:
            d = db.query(Department).filter(Department.organization_id == oid, Department.code == dcode).first()
            if not d:
                d = Department(organization_id=oid, name=dname, code=dcode, is_active=True)
                db.add(d)
                db.commit()
                db.refresh(d)
            dept_map[dcode] = d.id

        # 5. Seed Complaint Categories
        categories = [
            (pmc_id, dept_map["ELEC"], "Streetlights & Electrical Outages", "स्ट्रीटलाईट समस्या", "P2_HIGH", 24, "Lightbulb"),
            (pmc_id, dept_map["ROADS"], "Road Damage & Potholes", "रस्त्यावरील खड्डे", "P2_HIGH", 48, "Construction"),
            (pmc_id, dept_map["WATER"], "Water Supply & Pipe Leaks", "पाणीपुरवठा व गळती", "P2_HIGH", 12, "Droplet"),
            (pmc_id, dept_map["DRAIN"], "Drainage & Sewage Overflow", "ड्रेनेज व सांडपाणी", "P2_HIGH", 24, "Waves"),
            (pmc_id, dept_map["SWM"], "Garbage & Solid Waste", "कचरा व्यवस्थापन", "P3_MEDIUM", 12, "Trash2"),
            (pmc_id, dept_map["ELEC"], "Public Safety & Live Wire Hazards", "उघड्या विद्युत तारा", "P0_CRITICAL", 2, "Zap"),
        ]
        cat_map = {}
        for oid, did, cname, mr_name, pri, sla, icon in categories:
            c = db.query(ComplaintCategory).filter(ComplaintCategory.organization_id == oid, ComplaintCategory.name == cname).first()
            if not c:
                c = ComplaintCategory(organization_id=oid, department_id=did, name=cname, name_mr=mr_name, default_priority=pri, sla_hours=sla, icon_name=icon)
                db.add(c)
                db.commit()
                db.refresh(c)
            cat_map[cname] = c.id

        # 6. Seed Demo Users for the 5 Canonical Roles
        pw_hash = get_password_hash("Password123!")
        demo_users = [
            ("Super Admin", "superadmin@janseva.in", "9900000001", role_map["SUPER_ADMIN"], None, None),
            ("Shri Rajiv Deshmukh (Municipal Commissioner)", "admin@pmc.gov.in", "9900000002", role_map["ORG_ADMIN"], pmc_id, ward_map[14]),
            ("Smt. Sunita More (Nagar Sevak - Ward 14)", "nagarsevak.ward14@pmc.gov.in", "9900000003", role_map["NAGAR_SEVAK"], pmc_id, ward_map[14]),
            ("Ramesh Sonawane (Field Technician)", "staff.electrical@pmc.gov.in", "9900000004", role_map["STAFF"], pmc_id, ward_map[14]),
            ("Aarav Sharma (Citizen)", "citizen@janseva.in", "9876543210", role_map["CITIZEN"], pmc_id, ward_map[14]),
        ]
        user_map = {}
        for name, email, mob, rid, oid, wid in demo_users:
            u = db.query(User).filter(User.email == email).first()
            if not u:
                u = User(
                    full_name=name, email=email, mobile=mob,
                    password_hash=pw_hash, role_id=rid,
                    organization_id=oid, ward_id=wid,
                    reward_points=110 if "citizen" in email else 0,
                    is_active=True
                )
                db.add(u)
                db.commit()
                db.refresh(u)
            user_map[email] = u.id

        # 7. Seed DPDP Consent Types
        consent_types = [
            ("ESSENTIAL_SERVICE", "Essential Account & Civic Processing", "Account authentication and ticket processing", True),
            ("GEOLOCATION", "GPS & Geolocation Coordinates", "Capturing location for municipal field dispatch", False),
            ("MEDIA_PROCESSING", "Photographic & Video Uploads", "Evidence verification and defect analysis", False),
            ("PUBLIC_DISPLAY", "Public Area Map Display", "Visibility of grievance on open civic map", False),
            ("DEPARTMENT_SHARING", "Sharing with Responsible Departments", "Inter-department routing for repairs", True),
            ("AI_PROCESSING", "AI Triaging & Multilingual Assistant", "Automated priority suggestion and voice transcription", False),
            ("ANALYTICS", "Aggregated Municipal Analytics", "Citywide SLA and trend reporting without personal identifiers", False),
        ]
        for code, cname, desc, mandatory in consent_types:
            ct = db.query(ConsentType).filter(ConsentType.code == code).first()
            if not ct:
                db.add(ConsentType(code=code, name=cname, description=desc, is_mandatory=mandatory))
        db.commit()

        # 8. Seed Sample Complaints
        complaints_data = [
            (
                "JS-2026-00125", pmc_id, user_map["citizen@janseva.in"], cat_map["Streetlights & Electrical Outages"], ward_map[14],
                "Severe Streetlight Outage at Mayur Colony 5th Cross",
                "Entire street pole 14/B is dark since yesterday. Live sparking noticed earlier.",
                "Mayur Colony, Opp. Joggers Park", 18.5074, 73.8077, "P1_HIGHEST", "WORK_COMPLETED_AWAITING_VERIFICATION"
            ),
            (
                "JS-2026-00204", pmc_id, user_map["citizen@janseva.in"], cat_map["Road Damage & Potholes"], ward_map[14],
                "Deep Pothole Causing Skidding near Paud Phata",
                "Dangerous pothole approx 2 feet wide right after flyover descent.",
                "Paud Phata Chowk", 18.5085, 73.8120, "P2_HIGH", "WORK_IN_PROGRESS"
            )
        ]
        for cnum, oid, uid, cid, wid, title, desc, loc, lat, lng, pri, st in complaints_data:
            comp = db.query(Complaint).filter(Complaint.complaint_number == cnum).first()
            if not comp:
                comp = Complaint(
                    complaint_number=cnum, organization_id=oid, citizen_id=uid,
                    category_id=cid, ward_id=wid, title=title, description=desc,
                    location_address=loc, latitude=lat, longitude=lng,
                    priority=pri, status=st, visibility="PUBLIC_ANONYMOUS",
                    sla_deadline_at=datetime.utcnow() + timedelta(hours=24)
                )
                db.add(comp)
                db.commit()
                db.refresh(comp)

                db.add(ComplaintUpdate(
                    complaint_id=comp.id, previous_status=None, new_status=st,
                    updated_by_user_id=uid, comments="Seeded complaint record"
                ))
                db.commit()

        # 9. Seed Contractor and Projects
        c = db.query(Contractor).filter(Contractor.license_number == "LIC-MH-PMC-0941").first()
        if not c:
            c = Contractor(
                organization_id=pmc_id, company_name="Shree Infra Projects Ltd.",
                license_number="LIC-MH-PMC-0941", contact_person="Vijay Patil",
                phone="9822012345", rating=4.8
            )
            db.add(c)
            db.commit()
            db.refresh(c)

        c2 = db.query(Contractor).filter(Contractor.license_number == "LIC-MH-PMC-0812").first()
        if not c2:
            c2 = Contractor(
                organization_id=pmc_id, company_name="GreenGrid Electricals & Utilities",
                license_number="LIC-MH-PMC-0812", contact_person="Anand Shinde",
                phone="9822099881", rating=4.9
            )
            db.add(c2)
            db.commit()
            db.refresh(c2)

        projects_data = [
            (
                "PMC-DEV-2026-08", pmc_id, ward_map[14], c.id,
                "Ward 14 Smart Stormwater Drainage & Culvert Widening",
                "Culvert widening and smart silt-sensor chambers to eliminate monsoon waterlogging at Mayur Colony junction.",
                "Drainage & Flood Mitigation", "IN_PROGRESS",
                4500000.0, 4500000.0, 3240000.0, 72,
                datetime(2026, 1, 10), datetime(2026, 5, 30),
                [
                    ("Topographical Survey & Utility Mapping", 20, "COMPLETED"),
                    ("Excavation and Reinforced Concrete Culverts", 30, "COMPLETED"),
                    ("Stormwater Silt Traps & Sensor Installation", 30, "IN_PROGRESS"),
                    ("Road Restoration & Surface Bituminization", 20, "PENDING")
                ]
            ),
            (
                "PMC-DEV-2026-14", pmc_id, ward_map[14], c2.id,
                "Ward 14 Smart LED Solar Streetlight Grid Modernization",
                "Replacement of sodium vapor fixtures with 320 smart astronomical timer LED solar luminaires across Kothrud.",
                "Streetlights & Energy", "COMPLETED",
                1850000.0, 1850000.0, 1810000.0, 100,
                datetime(2025, 10, 1), datetime(2026, 2, 15),
                [
                    ("Procurement & BIS Quality Inspection", 25, "COMPLETED"),
                    ("Pole Wiring Overhaul & Earthing", 25, "COMPLETED"),
                    ("Smart Fixture & IoT Controller Mounting", 30, "COMPLETED"),
                    ("Centralized SCADA Gateway Integration", 20, "COMPLETED")
                ]
            ),
            (
                "PMC-DEV-2026-21", pmc_id, ward_map[14], c.id,
                "Paud Road Asphalt Recarpetting & Pedestrian Walkway",
                "High-density bitumen recarpetting, tactile pedestrian footpaths, and rainwater runoff gutters along Paud Road.",
                "Roads & Infrastructure", "IN_PROGRESS",
                8200000.0, 8200000.0, 3690000.0, 45,
                datetime(2026, 2, 1), datetime(2026, 8, 30),
                [
                    ("Milling Old Asphalt Surface", 25, "COMPLETED"),
                    ("Sub-base Layer Compaction", 25, "IN_PROGRESS"),
                    ("Dense Bituminous Macadam (DBM)", 25, "PENDING"),
                    ("Pedestrian Paver Blocks & Kerb Painting", 25, "PENDING")
                ]
            ),
            (
                "PMC-DEV-2026-30", pmc_id, ward_map[14], c.id,
                "Ward 14 Senior Citizen Ecological Park & Open Gym",
                "Community open gym, native shade trees, solar garden lighting, rainwater harvesting pit, and acupressure track.",
                "Parks & Environment", "IN_PROGRESS",
                2500000.0, 2500000.0, 2250000.0, 90,
                datetime(2025, 11, 15), datetime(2026, 3, 31),
                [
                    ("Landscaping & Perimeter Fencing", 30, "COMPLETED"),
                    ("Open Gym Equipment Installation", 30, "COMPLETED"),
                    ("Acupressure Walkway & Gazebo", 20, "COMPLETED"),
                    ("Solar Night Illumination & Final Plantings", 20, "IN_PROGRESS")
                ]
            )
        ]

        for pcode, oid, wid, cid, title, desc, cat, status, abud, allf, exp, prog, sdate, edate, milestones in projects_data:
            p = db.query(DevelopmentProject).filter(DevelopmentProject.project_code == pcode).first()
            if not p:
                p = DevelopmentProject(
                    project_code=pcode, organization_id=oid, ward_id=wid,
                    contractor_id=cid, title=title, description=desc,
                    category=cat, status=status,
                    approved_budget=abud, allocated_funds=allf, recorded_expenditure=exp,
                    progress_percentage=prog, start_date=sdate,
                    expected_completion_date=edate
                )
                db.add(p)
                db.commit()
                db.refresh(p)

                for mtitle, mweight, mstatus in milestones:
                    ms = ProjectMilestone(
                        project_id=p.id,
                        title=mtitle,
                        weightage_percent=mweight,
                        status=mstatus
                    )
                    db.add(ms)
                db.commit()

        # 10. Seed Verified Government & Welfare Schemes
        schemes_data = [
            (
                "PMAY-U-2026",
                "Pradhan Mantri Awas Yojana (Urban 2.0)",
                "Housing",
                "CENTRAL",
                "Ministry of Housing & Urban Affairs",
                "Interest subsidy and financial assistance for pucca housing to urban poor, EWS, and LIG families living in municipal areas.",
                "Urban families having annual income up to ₹3,00,000 (EWS) or ₹6,00,000 (LIG), without any existing pucca house anywhere in India.",
                "Direct credit subsidy up to ₹2.50 Lakh transferred to beneficiary home loan account; prioritized title deeds in the name of female head of house.",
                "₹2,50,000 Subsidy",
                "Aadhaar Card\nIncome Certificate from Tahsildar\nBank Account Passbook\nNo-Pucca-House Self-Declaration\nProperty Document / Allotment Letter",
                "1. Apply online via PMAY-Urban portal or visit nearest Municipal Ward Citizen Center.\n2. Submit biometric e-KYC and document verification.\n3. Ward inspection and geolocated verification.\n4. Direct subsidy disbursement.",
                "https://pmaymis.gov.in",
                "1800-11-3377",
                "Ongoing (Phase 2 Open)",
                True
            ),
            (
                "AB-PMJAY-2026",
                "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana",
                "Healthcare",
                "CENTRAL",
                "National Health Authority",
                "World's largest health assurance scheme providing cashless hospitalisation cover to vulnerable urban and rural families.",
                "Families identified under SECC 2011 criteria or registered BPL/APL cards, or senior citizens aged 70+ irrespective of income tier.",
                "Cashless, paperless in-patient treatment up to ₹5,00,000 per family per year across 28,000+ empanelled government and private hospitals.",
                "₹5,00,000 / Year Cover",
                "Aadhaar Card\nRation Card / Family ID\nMobile Number linked with Aadhaar",
                "1. Check eligibility on mera.pmjay.gov.in or PMC Arogya Kendra.\n2. Visit any Empanelled Hospital or CSC Center with Aadhaar.\n3. Biometric e-KYC and instant PVC Golden Card issue.",
                "https://pmjay.gov.in",
                "14555",
                "Continuous Enrollment",
                True
            ),
            (
                "MH-LADKI-BAHIN-01",
                "Mukhyamantri Majhi Ladki Bahin Yojana",
                "Women Empowerment",
                "STATE",
                "Women & Child Development Dept, Govt. of Maharashtra",
                "Monthly financial assistance and economic empowerment grant transferred directly to eligible women residents of Maharashtra.",
                "Women permanent residents of Maharashtra aged 21 to 65 years with annual family income below ₹2.5 Lakh.",
                "Direct Benefit Transfer (DBT) of ₹1,500 every month directly deposited into the woman's Aadhaar-linked bank account.",
                "₹1,500 / Month DBT",
                "Aadhaar Card\nMaharashtra Domicile Certificate / Voter ID\nFamily Income Certificate (below ₹2.5L)\nAadhaar-Seeded Bank Passbook\nPassport Photo",
                "1. Register on Nari Shakti Doot App or Janseva Portal.\n2. Fill online application and upload Aadhaar and bank details.\n3. Ward Officer e-Verification.\n4. Direct monthly bank transfer.",
                "https://ladakibahin.maharashtra.gov.in",
                "181",
                "Open for FY 2026-27",
                True
            ),
            (
                "PM-KISAN-01",
                "PM-KISAN Samman Nidhi",
                "Farmers",
                "CENTRAL",
                "Ministry of Agriculture & Farmers Welfare",
                "Income support scheme granting financial assistance to all landholding farmer families across the country.",
                "All cultivable landholding farmer families with land title registered in revenue records, subject to standard exclusion criteria.",
                "₹6,000 per year transferred in three equal four-monthly installments of ₹2,000 each into bank accounts via DBT.",
                "₹6,000 / Year DBT",
                "Aadhaar Card\nLand Ownership Record (7/12 Extract)\nAadhaar-Linked Bank Account\nMobile Number",
                "1. Register on pmkisan.gov.in or PMC Agro Extension Desk.\n2. Complete Aadhaar e-KYC and land seeding.\n3. Automatic tri-annual installment credit.",
                "https://pmkisan.gov.in",
                "155261",
                "Continuous Enrollment",
                False
            ),
            (
                "SCHOLAR-POST-MATRIC",
                "National Post-Matric Scholarship for Meritorious Students",
                "Students",
                "CENTRAL",
                "Ministry of Social Justice & Empowerment",
                "Financial assistance for higher post-secondary education covering 100% of college tuition fees and annual maintenance allowance.",
                "Regular students pursuing post-matriculation or professional courses with annual parental income below ₹2.5 Lakh.",
                "Full tuition fee reimbursement paid directly to institution plus ₹1,200/month living expense stipend to student.",
                "100% Tuition + Living Stipend",
                "Aadhaar Card\n10th / 12th Marksheets\nCollege Admission Fee Receipt\nCaste / Income Certificate\nStudent Bank Passbook",
                "1. Apply on National Scholarship Portal (scholarships.gov.in).\n2. Upload institutional bonafide and fee structure.\n3. College nodal verification.\n4. Direct DBT disbursement.",
                "https://scholarships.gov.in",
                "0120-6619540",
                "31 Oct 2026",
                False
            ),
            (
                "PMMY-MUDRA-01",
                "Pradhan Mantri MUDRA Yojana (Micro Loans)",
                "Employment",
                "CENTRAL",
                "Department of Financial Services",
                "Collateral-free business loans for small shopkeepers, artisans, micro-enterprises, and municipal street vendors.",
                "Any Indian citizen planning or running a non-farm income generating micro/small enterprise (Shishu up to ₹50K, Kishore up to ₹5L, Tarun up to ₹10L).",
                "Zero collateral requirement, low processing fee, MUDRA debit card for overdraft working capital.",
                "Up to ₹10 Lakh Collateral-Free",
                "Aadhaar & PAN Card\nBusiness Proof / Municipal Vending License\n6 Months Bank Statement\nProject Quotation / Business Plan",
                "1. Apply via udyamimitra.in or any Nationalized Bank branch.\n2. Submit business concept note.\n3. Branch appraisal and sanctioned disbursement within 7 days.",
                "https://www.mudra.org.in",
                "1800-180-1111",
                "Open Year-Round",
                True
            ),
            (
                "IGNOAPS-SR-CITIZEN",
                "Indira Gandhi National Old Age Pension Scheme",
                "Senior Citizens",
                "CENTRAL",
                "Ministry of Rural Development & Social Welfare",
                "Social security pension ensuring dignified subsistence for underprivileged senior citizens residing in municipal areas.",
                "Citizens aged 60 years or older living below the poverty line (BPL) as per central/state guidelines.",
                "Monthly financial pension transferred directly into postal or savings bank account.",
                "Monthly Living Pension",
                "Age Proof (Birth Certificate / Aadhaar / Voter ID)\nBPL Ration Card\nBank / Post Office Passbook\nPassport Size Photographs",
                "1. Submit application to local Municipal Social Welfare office.\n2. Ward field officer biometric verification.\n3. Monthly automated electronic pension credit.",
                "https://nsap.nic.in",
                "1800-180-1551",
                "Ongoing",
                False
            ),
            (
                "PMC-SOLAR-REBATE",
                "PMC Solar Rooftop & Green Energy Municipal Rebate",
                "Civic Welfare",
                "MUNICIPAL",
                "Pune Municipal Corporation - Environment Cell",
                "Municipal tax incentive program rewarding cooperative housing societies and individual homeowners for installing solar panels.",
                "Any registered cooperative housing society or independent property owner in PMC jurisdiction with grid-tied rooftop solar.",
                "20% direct rebate on annual Municipal Property Tax general component for 5 consecutive financial years.",
                "20% Property Tax Rebate",
                "Latest Property Tax Paid Receipt\nMSEDCL Net Metering Commissioning Letter\nRooftop Solar Installation Certificate & Geotagged Photos",
                "1. Log in to Janseva Citizen Portal.\n2. Navigate to Schemes -> PMC Solar Rebate.\n3. Enter Property Index Number and upload net metering certificate.\n4. Instant tax discount ledger update.",
                "https://pmc.gov.in",
                "020-25501000",
                "31 March 2027",
                True
            )
        ]

        for scode, title, cat, lvl, dept, desc, elig, ben, fin, docs, proc, portal, helpn, deadl, feat in schemes_data:
            s = db.query(Scheme).filter(Scheme.scheme_code == scode).first()
            if not s:
                s = Scheme(
                    scheme_code=scode,
                    title=title,
                    category=cat,
                    level=lvl,
                    department=dept,
                    description=desc,
                    eligibility_criteria=elig,
                    benefits=ben,
                    financial_assistance=fin,
                    required_documents=docs,
                    application_process=proc,
                    official_portal_url=portal,
                    helpline_number=helpn,
                    deadline=deadl,
                    is_featured=feat,
                    is_active=True
                )
                db.add(s)
        db.commit()

        print("JANSEVA Database seeded successfully with multi-tenant roles, PMC wards, departments, seed complaints, projects, and 8 verified government schemes!")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
