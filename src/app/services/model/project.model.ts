export interface IDashboard {
  hikesCount: number;
  checkinCount: number;
  checkinTime: IDashboardCheckInTime[];
  emergencyCount: number;
  sosCount: number;
  offTrailHikerCount: number;
  unResolvedEventCount: number;
  pendingCount: number;
  infoCount: number;
  cautionCount: number;
  eventTotalCount: number;
  resolvedCount: number;
  dangerCount: number;
  allGps: IDashboardGps[];
  eventSos: IEventSos[];
}

export interface IEventSos {
  eventId: number;
  hikerId: number;
  hikerName: string;
  latpt: number;
  lngpt: number;
  alertLevelId: number;
}

export interface IDashboardGps {
  ptinfo: string;
  alertName: string;
  eventName: string;
  logtime: number;
  latpt: number;
  lngpt: number;
  isOpen?: boolean;
}

export interface IDashboardCheckInTime {
  hour: string;
  count: number;
}

export interface IEvent {
  id: number;
  eventTypeId: number;
  alertLevelId: number;
  eventInfo: string;
  eventTime: number;
  hikeId: number;
  latpt: number;
  lngpt: number;
  radius: number;
  reporterId: number;
  stat: string;
  logtime: number;
  eventTypeName: string;
  alertLevelName: string;
  reporterName: string;
  attachments: string[];
}

export interface IEventList {
  id: number;
  alertId: number;
  stat: string;
}

export interface IAlert {
  id: number;
  eventTypeId: number;
  alertLevelId: number;
  eventInfo: string;
  eventTime: number;
  eventEnd: number;
  permitId: number;
  latpt: number;
  lngpt: number;
  radius: number;
  creatorId: number;
  originEventId: number;
  logtime: number;
  eventTypeName: string;
  alertLevelName: string;
  permitName: string;
  creatorName: string;
  attachments: string[];
}

export interface IPermit {
  id: number;
  hikerId: number;
  hikeStart: string;
  hikeEnd: string;
  permitId: number;
  guideName: string;
  guideContact: string;
  guideContact2: string;
  permitAccepted: string;
  acceptedTime: string;
  memo: string;
  hikeStarted: boolean;
  hikeFinished: boolean;
  hikeCancelled: boolean;
  logtime: string;
  hikerInfo: IHikerInfo;
  trails: ITrail[];
}

export interface IPermitMemo {
  hikeId: number;
  hikerId: number;
  memo: string;
  watchStatus: string;
}

export interface IHikerInfo {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
  identification: string;
  gender: string;
  dob: string;
  address: string;
  email: string;
  nationality: string;
  identificationNumber: string;
  homeNumber: string;
  mobileNumber: string;
  satelliteNumber: string;
  emergencyContact: string;
  emergencyNumber: string;
  emergencyMobile: string;
  fcmToken: string;
  watchStatus: string;
}

export interface ITrail {
  id: number;
  name: string;
  permit: number;
}

export interface ICheckIn {
  id: number;
  hikerId: number;
  hikeId: number;
  checkinTime: string;
}

export interface IStation {
  id: number;
  name: string;
}

export interface ICreator {
  id: number;
  name: string;
}
