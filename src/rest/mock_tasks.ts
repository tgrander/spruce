export function getMockTasks() {
  return [
    {
      task_id:
        "spruce_ubuntu1604_compile_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22",
      project_id: "spruce",
      create_time: "2019-07-08T18:39:15.000Z",
      dispatch_time: "2019-07-12T18:30:08.667Z",
      scheduled_time: "2019-07-12T18:29:49.412Z",
      start_time: "2019-07-12T18:30:09.414Z",
      finish_time: "2019-07-12T18:32:16.828Z",
      ingest_time: "2019-07-12T18:21:23.024Z",
      version_id: "5d28cfa05623434037b0294c",
      revision: "e44b6da8831497cdd4621daf4c62985f0c1c9ca9",
      priority: 0,
      activated: true,
      activated_by: "",
      build_id:
        "spruce_ubuntu1604_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22",
      distro_id: "ubuntu1604-test",
      build_variant: "ubuntu1604",
      depends_on: null,
      display_name: "compile",
      host_id: "sir-dah86y8k",
      restarts: 0,
      execution: 0,
      order: 94,
      status: "success",
      status_details: {
        status: "success",
        type: "test",
        desc: "'subprocess.exec' in \"npm-build\" (#1)",
        timed_out: false
      },
      logs: {
        all_log:
          "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_compile_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22/0?type=ALL",
        task_log:
          "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_compile_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22/0?type=T",
        agent_log:
          "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_compile_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22/0?type=E",
        system_log:
          "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_compile_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22/0?type=S"
      },
      time_taken_ms: 127414,
      expected_duration_ms: 118661,
      est_wait_to_start_ms: 0,
      estimated_cost: 0.002576987475308642,
      generate_task: false,
      generated_by: "",
      artifacts: null,
      display_only: false,
      mainline: false
    },
    {
      task_id:
        "spruce_ubuntu1604_lint_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22",
      project_id: "spruce",
      create_time: "2019-07-08T18:39:15.000Z",
      dispatch_time: "2019-07-12T18:30:10.725Z",
      scheduled_time: "2019-07-12T18:29:49.412Z",
      start_time: "2019-07-12T18:30:11.561Z",
      finish_time: "2019-07-12T18:31:05.266Z",
      ingest_time: "2019-07-12T18:21:23.063Z",
      version_id: "5d28cfa05623434037b0294c",
      revision: "e44b6da8831497cdd4621daf4c62985f0c1c9ca9",
      priority: 0,
      activated: true,
      activated_by: "",
      build_id:
        "spruce_ubuntu1604_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22",
      distro_id: "ubuntu1604-test",
      build_variant: "ubuntu1604",
      depends_on: null,
      display_name: "lint",
      host_id: "sir-tzgr48xh",
      restarts: 0,
      execution: 0,
      order: 94,
      status: "success",
      status_details: {
        status: "success",
        type: "test",
        desc: "'subprocess.exec' in \"npm-lint\" (#1)",
        timed_out: false
      },
      logs: {
        all_log:
          "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_lint_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22/0?type=ALL",
        task_log:
          "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_lint_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22/0?type=T",
        agent_log:
          "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_lint_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22/0?type=E",
        system_log:
          "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_lint_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22/0?type=S"
      },
      time_taken_ms: 53705,
      expected_duration_ms: 48963,
      est_wait_to_start_ms: 0,
      estimated_cost: 0.001086200200617284,
      generate_task: false,
      generated_by: "",
      artifacts: null,
      display_only: false,
      mainline: false
    },
    {
      task_id:
        "spruce_ubuntu1604_test_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22",
      project_id: "spruce",
      create_time: "2019-07-08T18:39:15.000Z",
      dispatch_time: "2019-07-12T18:30:37.337Z",
      scheduled_time: "2019-07-12T18:29:49.412Z",
      start_time: "2019-07-12T18:30:38.038Z",
      finish_time: "2019-07-12T18:31:27.481Z",
      ingest_time: "2019-07-12T18:21:23.095Z",
      version_id: "5d28cfa05623434037b0294c",
      revision: "e44b6da8831497cdd4621daf4c62985f0c1c9ca9",
      priority: 0,
      activated: true,
      activated_by: "",
      build_id:
        "spruce_ubuntu1604_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22",
      distro_id: "ubuntu1604-test",
      build_variant: "ubuntu1604",
      depends_on: null,
      display_name: "test",
      host_id: "sir-prc87qqg",
      restarts: 0,
      execution: 0,
      order: 94,
      status: "success",
      status_details: {
        status: "success",
        type: "test",
        desc: "'attach.xunit_results' in \"attach-results\" (#1)",
        timed_out: false
      },
      logs: {
        all_log:
          "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_test_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22/0?type=ALL",
        task_log:
          "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_test_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22/0?type=T",
        agent_log:
          "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_test_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22/0?type=E",
        system_log:
          "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_test_patch_e44b6da8831497cdd4621daf4c62985f0c1c9ca9_5d28cfa05623434037b0294c_19_07_12_18_21_22/0?type=S"
      },
      time_taken_ms: 49443,
      expected_duration_ms: 55331,
      est_wait_to_start_ms: 0,
      estimated_cost: 0.0009999999351851853,
      generate_task: false,
      generated_by: "",
      artifacts: null,
      display_only: false,
      mainline: false
    }
  ] as object;
}