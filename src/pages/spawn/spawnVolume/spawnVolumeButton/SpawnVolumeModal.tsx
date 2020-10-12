import React, { useReducer } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Variant } from "@leafygreen-ui/button";
import { Subtitle } from "@leafygreen-ui/typography";
import { InputNumber, Select } from "antd";
import Icon from "components/icons/Icon";
import { Modal } from "components/Modal";
import { RegionSelector, Section, WideButton } from "components/Spawn";
import { InputLabel } from "components/styles";
import { useBannerDispatchContext } from "context/banners";
import {
  AwsRegionsQuery,
  AwsRegionsQueryVariables,
  SpawnVolumeMutation,
  SpawnVolumeMutationVariables,
} from "gql/generated/types";
import { SPAWN_VOLUME } from "gql/mutations/spawn-volume";
import { GET_AWS_REGIONS } from "gql/queries";

const { Option } = Select;

interface SpawnVolumeModalProps {
  visible: boolean;
  onCancel: () => void;
}

enum ActionType {
  SetSize = "setSize",
  SetAvailabilityZone = "setAvailabilityZone",
  SetType = "setType",
}

export const SpawnVolumeModal: React.FC<SpawnVolumeModalProps> = ({
  visible,
  onCancel,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchBanner = useBannerDispatchContext();
  const [spawnVolumeMutation, { loading: loadingSpawnVolume }] = useMutation<
    SpawnVolumeMutation,
    SpawnVolumeMutationVariables
  >(SPAWN_VOLUME, {
    onCompleted() {
      onCancel();
      dispatchBanner.successBanner("Successfully spawned volume");
    },
    onError(err) {
      onCancel();
      dispatchBanner.errorBanner(
        `There was an error while spawning your volume: ${err.message}`
      );
    },
    refetchQueries: ["MyVolumes"],
  });
  const { data: awsData } = useQuery<AwsRegionsQuery, AwsRegionsQueryVariables>(
    GET_AWS_REGIONS
  );

  const spawnVolume = () => {
    spawnVolumeMutation({ variables: { SpawnVolumeInput: state } });
  };
  const canSubmitSpawnVolume = true;

  return (
    <Modal
      title="Spawn New Volume"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <WideButton onClick={onCancel} key="cancel-button">
          Cancel
        </WideButton>,
        <WideButton
          data-cy="spawn-volume-button"
          disabled={!canSubmitSpawnVolume || loadingSpawnVolume}
          onClick={spawnVolume}
          variant={Variant.Primary}
          key="spawn-volume-button"
          glyph={loadingSpawnVolume && <Icon glyph="Refresh" />}
        >
          {loadingSpawnVolume ? "Spawning Volume" : "Spawn"}
        </WideButton>,
      ]}
      data-cy="spawn-volume-modal"
    >
      <div>
        <Subtitle>Required Volume Information</Subtitle>
        <Section>
          <InputLabel htmlFor="volumeSize">Size</InputLabel>
          <InputNumber
            min={1}
            max={500}
            value={state.size}
            onChange={(value) =>
              dispatch({ type: ActionType.SetSize, data: value as number })
            }
          />
        </Section>
        <RegionSelector
          onChange={(value) =>
            dispatch({ type: ActionType.SetAvailabilityZone, data: value })
          }
          selectedRegion={state.availabilityZone}
          awsRegions={awsData?.awsRegions}
        />
        <Section>
          <InputLabel htmlFor="typeDropown">Type</InputLabel>
          <Select
            id="typeDropown"
            showSearch
            style={{ width: 200 }}
            placeholder="Select a type"
            onChange={(type) =>
              dispatch({ type: ActionType.SetType, data: type })
            }
            value={state.type}
          >
            {typeOptions.map((type) => (
              <Option value={type} key={`type_option_${type}`}>
                {type}
              </Option>
            ))}
          </Select>
        </Section>
      </div>
    </Modal>
  );
};

enum VolumeType {
  Gp2 = "gp2",
  Io2 = "io1",
  Sc1 = "sc1",
  St1 = "st1",
  Standard = "standard",
}

const typeOptions = Object.values(VolumeType);

const initialState: SpawnVolumeMutationVariables["SpawnVolumeInput"] = {
  availabilityZone: "",
  size: 500,
  type: VolumeType.Gp2,
  expiration: null,
  noExpiration: false,
  host: "",
};

interface Action {
  type: ActionType;
  data: any;
}

function reducer(
  state: SpawnVolumeMutationVariables["SpawnVolumeInput"],
  action: Action
) {
  switch (action.type) {
    case ActionType.SetSize:
      return { ...state, size: action.data };
    case ActionType.SetAvailabilityZone:
      return { ...state, availabilityZone: action.data };
    case ActionType.SetType:
      return { ...state, type: action.data };
    default:
      return state;
  }
}
