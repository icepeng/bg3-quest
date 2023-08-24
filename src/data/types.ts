export interface Marker {
  DisplayText: string;
  Guid: string;
  MarkerID: string;
  MarkerIcon: string;
  MarkerLevel: string;
  MarkerTargetObjectType: string;
  MarkerTargetObjectUUID: string;
  Radius: number;
}

export interface Objective {
  Description: string;
  ObjectiveID: string;
  Priority: number;
  QuestID: string;
  Markers: Marker[];
}

export interface QuestStep {
  Achievement: string;
  Description: string;
  DevComment: string;
  DialogFlagGUID: string;
  ExperienceReward: string;
  ID: string;
  LevelOverride: number;
  Objective: Objective;
  QuestRewardCount: number;
  QuestRewardLevel: number;
  QuestTitleOverride: string;
  ReputationGain: number;
  RewardAdditionalGold: string;
  RewardAdditionalOwnerGUID: string;
  RewardAdditionalOwnerLevelName: string;
  RewardAdditionalOwnerName: string;
  RewardAdditionalTreasureTable: string;
  StatTriggerGUID: string;
  UnlockDisable: number;
}

export interface Quest {
  CategoryID: string;
  ParentQuestID: string;
  QuestID: string;
  QuestRewardTarget: number;
  QuestTitle: string;
  QuestVisiblity: boolean;
  SortingPriority: number;
  QuestSteps: QuestStep[];
}
