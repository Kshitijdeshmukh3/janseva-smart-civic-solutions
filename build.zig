const std = @import("std");

pub fn build(b: *std.Build) void {
    // Standard target and optimization options
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    _ = target;
    _ = optimize;

    // Run Backend Step
    const run_backend_cmd = b.addSystemCommand(&[_][]const u8{
        "python",
        "-m",
        "uvicorn",
        "app.main:app",
        "--host",
        "0.0.0.0",
        "--port",
        "8000",
        "--reload",
    });
    run_backend_cmd.setCwd(b.path("backend"));
    const backend_step = b.step("backend", "Run the FastAPI backend server with reload");
    backend_step.dependOn(&run_backend_cmd.step);

    // Run Frontend Step
    const run_frontend_cmd = b.addSystemCommand(&[_][]const u8{
        "npm",
        "run",
        "dev",
        "--",
        "--host",
        "0.0.0.0",
        "--port",
        "3000",
    });
    run_frontend_cmd.setCwd(b.path("frontend"));
    const frontend_step = b.step("frontend", "Run the Vite frontend development server");
    frontend_step.dependOn(&run_frontend_cmd.step);

    // Build Frontend Step
    const build_frontend_cmd = b.addSystemCommand(&[_][]const u8{
        "npm",
        "run",
        "build",
    });
    build_frontend_cmd.setCwd(b.path("frontend"));
    const build_step = b.step("build-frontend", "Build the production PWA bundle");
    build_step.dependOn(&build_frontend_cmd.step);
}
