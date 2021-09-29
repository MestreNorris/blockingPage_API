export type Whitelist = {
    link?: String
    creatAt?: String
}

export type Blacklist = {
    link?: String
    creatAt?: String
    activityDate?: Array<{ date: String, databaseActivity: { pishTank: boolean, openPhish: boolean } }>
}

export type Metric = {
    qntRequest?: Array<{ date: String, numberRequest: number }>
    lastUpdate?: String
    qntBlockedPhising?: Array<{ date: String, qntBlocked: number }>
    listPages?: Array<{ pageName: String, qntAcess: number }>
}