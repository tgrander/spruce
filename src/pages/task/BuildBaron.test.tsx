import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { addMilliseconds } from "date-fns";
import { withRouter } from "react-router-dom";
import { GET_TASK_EVENT_DATA } from "analytics/task/query";
import BuildBaron from "components/Buildbaron/BuildBaron";
import { FILE_JIRA_TICKET } from "gql/mutations/file-jira-ticket";
import { GET_SPRUCE_CONFIG, GET_USER, TASK_QUEUE_POSITION } from "gql/queries";
import { GET_CREATED_TICKETS } from "gql/queries/get-created-tickets";
import {
  customRenderWithRouterMatch as render,
  act,
} from "test_utils/test-utils";
import { Metadata } from "./Metadata";

const taskId =
  "spruce_ubuntu1604_e2e_test_e0ece5ad52ad01630bdf29f55b9382a26d6256b3_20_08_26_19_20_41";

const buildBaronQuery = {
  buildBaron: {
    buildBaronConfigured: true,
    searchReturnInfo: {
      issues: [
        {
          key: "EVG-12345",
          fields: {
            summary: "This is a random Jira ticket title 1",
            assigneeDisplayName: null,
            resolutionName: "Declined",
            created: "2020-09-23T15:31:33.000+0000",
            updated: "2020-09-23T15:33:02.000+0000",
            status: {
              id: "5",
              name: "Resolved",
            },
          },
        },
        {
          key: "EVG-12346",
          fields: {
            summary: "This is a random Jira ticket title 2",
            assigneeDisplayName: "John Liu",
            resolutionName: "Declined",
            created: "2020-09-18T16:58:32.000+0000",
            updated: "2020-09-18T19:56:42.000+0000",
            status: {
              id: "6",
              name: "Closed",
            },
          },
        },
        {
          key: "EVG-12347",
          fields: {
            summary: "This is a random Jira ticket title 3",
            assigneeDisplayName: "Backlog - Evergreen Team",
            resolutionName: "Declined",
            created: "2020-09-18T17:04:06.000+0000",
            updated: "2020-09-18T19:56:29.000+0000",
            status: {
              id: "1",
              name: "Open",
            },
          },
        },
      ],
      search:
        '(project in (EVG)) and ( text~"docker\\\\-cleanup" ) order by updatedDate desc',
      source: "JIRA",
      featuresURL: "",
    },
  },
};

const taskQuery = {
  taskFiles: { __typename: "TaskFiles", fileCount: 38 },
  task: {
    isPerfPluginEnabled: false,
    __typename: "Task",
    activatedBy: "",
    baseTaskMetadata: {
      __typename: "BaseTaskMetadata",
      baseTaskDuration: 1228078,
      baseTaskLink:
        "https://evergreen.mongodb.com/task/spruce_ubuntu1604_e2e_test_e0ece5ad52ad01630bdf29f55b9382a26d6256b3_20_08_26_19_20_41",
    },
    createTime: new Date("2020-08-26T19:20:41Z"),
    estimatedStart: 1000,
    displayName: "e2e_test",
    hostId: "i-0e0e62799806e037d",
    hostLink: "https://evergreen.mongodb.com/host/i-0e0e62799806e037d",
    patchMetadata: { __typename: "PatchMetadata", author: "mohamed.khelif" },
    patchNumber: 417,
    reliesOn: [],
    logs: {
      __typename: "TaskLogLinks",
      allLogLink:
        "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_e2e_test_patch_e0ece5ad52ad01630bdf29f55b9382a26d6256b3_5f4889313627e0544660c800_20_08_28_04_33_55/0?type=ALL",
      agentLogLink:
        "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_e2e_test_patch_e0ece5ad52ad01630bdf29f55b9382a26d6256b3_5f4889313627e0544660c800_20_08_28_04_33_55/0?type=E",
      systemLogLink:
        "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_e2e_test_patch_e0ece5ad52ad01630bdf29f55b9382a26d6256b3_5f4889313627e0544660c800_20_08_28_04_33_55/0?type=S",
      taskLogLink:
        "https://evergreen.mongodb.com/task_log_raw/spruce_ubuntu1604_e2e_test_patch_e0ece5ad52ad01630bdf29f55b9382a26d6256b3_5f4889313627e0544660c800_20_08_28_04_33_55/0?type=T",
      eventLogLink:
        "https://evergreen.mongodb.com/event_log/task/spruce_ubuntu1604_e2e_test_patch_e0ece5ad52ad01630bdf29f55b9382a26d6256b3_5f4889313627e0544660c800_20_08_28_04_33_55",
    },
    status: "pending",
    version: "5f4889313627e0544660c800",
    revision: "e0ece5ad52ad01630bdf29f55b9382a26d6256b3",
    failedTestCount: 0,
    spawnHostLink:
      "https://evergreen.mongodb.com/spawn?distro_id=ubuntu1604-small&task_id=spruce_ubuntu1604_e2e_test_patch_e0ece5ad52ad01630bdf29f55b9382a26d6256b3_5f4889313627e0544660c800_20_08_28_04_33_55",
    priority: 0,
    canRestart: true,
    canAbort: false,
    canSchedule: false,
    canUnschedule: false,
    canSetPriority: false,
    ami: "ami-0c83bb0a9f48c15bf",
    distroId: "ubuntu1604-small",
    latestExecution: 0,
    blocked: false,
  },
};

const taskAboutToStart = {
  taskFiles: {
    ...taskQuery.taskFiles,
  },
  task: {
    ...taskQuery.task,
    status: "pending",
  },
};

const taskStarted = {
  taskFiles: {
    ...taskQuery.taskFiles,
  },
  task: {
    ...taskQuery.task,
    startTime: new Date(),
    estimatedStart: 0,
    status: "started",
  },
};
const taskSucceeded = {
  taskFiles: {
    ...taskStarted.taskFiles,
  },
  task: {
    ...taskStarted.task,
    finishTime: addMilliseconds(new Date(), 1228078),
    status: "succeeded",
  },
};
const mocks = [
  {
    request: {
      query: FILE_JIRA_TICKET,
    },
    result: {
      data: {
        bbCreateTicket: true,
      },
    },
  },
  {
    request: {
      query: GET_CREATED_TICKETS,
    },
    result: {
      data: {
        bbGetCreatedTickets: [],
      },
    },
  },
  {
    request: {
      query: GET_SPRUCE_CONFIG,
    },
    result: {
      data: {
        spruceConfig: {
          bannerTheme: "information",
          banner: "",
          ui: {
            userVoice: "",
          },
          jira: {
            host: "jira.mongodb.org",
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_USER,
    },
    result: {
      data: {
        userId: "mohamed.khelif",
        displayName: "Mohamed Khelif",
      },
    },
  },
  {
    request: {
      query: GET_TASK_EVENT_DATA,
      variables: {
        taskId,
      },
    },
    result: {
      data: {
        task: {
          __typename: "Task",
          id: taskId,
          status: "started",
          failedTestCount: 0,
        },
      },
    },
  },
  {
    request: {
      query: TASK_QUEUE_POSITION,
      variables: {
        taskId,
      },
    },
    result: {
      data: {
        task: {
          __typename: "Task",
          id: taskId,
          minQueuePosition: 0,
        },
      },
    },
  },
];

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.useRealTimers();
});
test("Renders the metadata card with a pending status", async () => {
  const ContentWrapper = () => (
    <MockedProvider mocks={mocks}>
      <Metadata
        taskId={taskId}
        loading={false}
        data={taskAboutToStart}
        error={undefined}
      />
    </MockedProvider>
  );

  const { queryByDataCy } = render(withRouter(ContentWrapper), {
    route: `/task/${taskId}`,
    path: "/task/:id",
  });
  expect(queryByDataCy("task-metadata-estimated_start")).toHaveTextContent(
    "1s"
  );
  expect(queryByDataCy("metadata-eta-timer")).toBeNull();
  expect(queryByDataCy("task-metadata-started")).toBeNull();
  expect(queryByDataCy("task-metadata-finished")).toBeNull();
});
test("Renders the metadata card with a started status", async () => {
  const ContentWrapper = () => (
    <MockedProvider mocks={mocks}>
      <Metadata
        taskId={taskId}
        loading={false}
        data={taskStarted}
        error={undefined}
      />
    </MockedProvider>
  );

  const { queryByDataCy } = render(withRouter(ContentWrapper), {
    route: `/task/${taskId}`,
    path: "/task/:id",
  });
  act(() => {
    jest.advanceTimersByTime(1200);
  });
  expect(queryByDataCy("task-metadata-estimated_start")).toBeNull();
  expect(queryByDataCy("metadata-eta-timer")).toHaveTextContent("20m");
  expect(queryByDataCy("task-metadata-started")).toBeInTheDocument();
  expect(queryByDataCy("task-metadata-finished")).toBeNull();
});

test("Renders the metadata card with a succeeded status", async () => {
  const ContentWrapper = () => (
    <MockedProvider mocks={mocks}>
      <Metadata
        taskId={taskId}
        loading={false}
        data={taskSucceeded}
        error={undefined}
      />
    </MockedProvider>
  );

  const { queryByDataCy } = render(withRouter(ContentWrapper), {
    route: `/task/${taskId}`,
    path: "/task/:id",
  });

  expect(queryByDataCy("task-metadata-estimated_start")).toBeNull();
  expect(queryByDataCy("metadata-eta-timer")).toBeNull();
  expect(queryByDataCy("task-metadata-started")).toBeInTheDocument();
  expect(queryByDataCy("task-metadata-finished")).toBeInTheDocument();
});

test("Renders the metadata card with a succeeded status", async () => {
  const ContentWrapper = () => (
    <MockedProvider mocks={mocks}>
      <BuildBaron data={buildBaronQuery} error={undefined} taskId={taskId} />
    </MockedProvider>
  );

  const { queryByDataCy } = render(withRouter(ContentWrapper), {
    route: `/task/${taskId}`,
    path: "/task/:id",
  });

  expect(queryByDataCy("task-metadata-estimated_start")).toBeNull();
  expect(queryByDataCy("metadata-eta-timer")).toBeNull();
  expect(queryByDataCy("task-metadata-started")).toBeInTheDocument();
  expect(queryByDataCy("task-metadata-finished")).toBeInTheDocument();
});
