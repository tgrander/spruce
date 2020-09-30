import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import TestRenderer from "react-test-renderer"; // ES6
import { GET_TASK_EVENT_DATA } from "analytics/task/query";
import { BuildBaronContent } from "components/Buildbaron/BuildBaronContent";
import { BuildBaronTable } from "components/Buildbaron/BuildBaronTable";
import { FILE_JIRA_TICKET } from "gql/mutations/file-jira-ticket";
import {
  GET_BUILD_BARON,
  GET_SPRUCE_CONFIG,
  GET_USER,
  TASK_QUEUE_POSITION,
} from "gql/queries";
import { GET_CREATED_TICKETS } from "gql/queries/get-created-tickets";

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

// it("renders without error", () => {
//   TestRenderer.create(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <BuildBaron data={buildBaronQuery} error={undefined} taskId={taskId} />
//     </MockedProvider>
//   );
// });

it("renders without error", () => {
  TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BuildBaronContent
        eventData={buildBaronQuery.buildBaron}
        taskId={taskId}
      />
    </MockedProvider>
  );
});

it("renders without error", () => {
  TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BuildBaronTable
        jiraIssues={buildBaronQuery.buildBaron.searchReturnInfo.issues}
      />
    </MockedProvider>
  );
});
