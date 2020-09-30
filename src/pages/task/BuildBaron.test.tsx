import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { withRouter } from "react-router-dom";
import { GET_TASK_EVENT_DATA } from "analytics/task/query";
import BuildBaron from "components/Buildbaron/BuildBaron";
import { GET_BUILD_BARON } from "gql/queries";
import { GET_USER, TASK_QUEUE_POSITION } from "gql/queries";
import { customRenderWithRouterMatch as render } from "test_utils/test-utils";
// comment

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

const mocks = [
  {
    request: {
      query: GET_BUILD_BARON,
    },
    result: {
      data: buildBaronQuery,
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
      <BuildBaron data={buildBaronQuery} error={undefined} taskId={taskId} />
    </MockedProvider>
  );

  const { queryByDataCy } = render(withRouter(ContentWrapper), {
    route: `/task/${taskId}`,
    path: "/task/:id",
  });
  expect(queryByDataCy("task-metadata-estimated_start")).toHaveTextContent(
    "1s"
  );
  // expect(queryByDataCy("metadata-eta-timer")).toBeNull();
  // expect(queryByDataCy("task-metadata-started")).toBeNull();
  // expect(queryByDataCy("task-metadata-finished")).toBeNull();
});
