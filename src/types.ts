import {createRequire} from 'module'

const require = createRequire(import.meta.url)

const InAppRequire = {
    clan: require('./ru/in-app/clan.json'),
    common: require('./ru/in-app/common.json'),
    counts: require('./ru/in-app/counts.json'),
    embed: require('./ru/in-app/embed.json'),
    error: require('./ru/in-app/error.json'),
    interaction: require('./ru/in-app/interaction.json'),
    language: require('./ru/in-app/language.json'),
    lock: require('./ru/in-app/lock.json'),
    members: require('./ru/in-app/members.json'),
    mun: require('./ru/in-app/mun.json'),
    nickname: require('./ru/in-app/nickname.json'),
    qa: require('./ru/in-app/qa.json'),
    roles: require('./ru/in-app/roles.json'),
    select: require('./ru/in-app/select.json'),
    settings: require('./ru/in-app/settings.json'),
    stats: require('./ru/in-app/stats.json'),
    top: require('./ru/in-app/top.json')
}

const SlashRequire = {
    clan: require('./ru/slash/clan.json'),
    language: require('./ru/slash/language.json'),
    lock: require('./ru/slash/lock.json'),
    members: require('./ru/slash/members.json'),
    nickname: require('./ru/slash/nickname.json'),
    ping: require('./ru/slash/ping.json'),
    rank: require('./ru/slash/rank.json'),
    roles: require('./ru/slash/roles.json'),
    settings: require('./ru/slash/settings.json'),
    stats: require('./ru/slash/stats.json'),
    top: require('./ru/slash/top.json')
}

export type InApp = typeof InAppRequire
export type Slash = typeof SlashRequire