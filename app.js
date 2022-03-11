// Copyright (c) 2022 - present Carmen Alvarez
//
// This file is part of Poet Assistant.
//
// Poet Assistant is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Poet Assistant is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Poet Assistant.  If not, see <http://www.gnu.org/licenses/>.

const Server = require("./src/js/server.js")
const dbSetup = require("./src/js/repository/db.js")

const RhymeRepository = require("./src/js/repository/rhymerepository.js")
const RhymeService = require("./src/js/service/rhymeservice.js")
const RhymeApi = require("./src/js/api/rhymeapi.js")

const ThesaurusRepository = require("./src/js/repository/thesaurusrepository.js")
const ThesaurusService = require("./src/js/service/thesaurusservice.js")
const ThesaurusApi = require("./src/js/api/thesaurusapi.js")

const DefinitionRepository = require("./src/js/repository/definitionrepository.js")
const DefinitionService = require("./src/js/service/definitionservice.js")
const DefinitionApi = require("./src/js/api/definitionapi.js")

const WotdRepository = require("./src/js/repository/wotdrepository.js")
const WotdService = require("./src/js/service/wotdservice.js")
const WotdApi = require("./src/js/api/wotdapi.js")

dbSetup.then((db) => {
    const rhymeRepository = new RhymeRepository(db)
    const rhymeService = new RhymeService(rhymeRepository)
    const rhymeApi = new RhymeApi(rhymeService)

    const thesaurusRepository = new ThesaurusRepository(db)
    const thesaurusService = new ThesaurusService(thesaurusRepository)
    const thesaurusApi = new ThesaurusApi(thesaurusService)

    const definitionRepository = new DefinitionRepository(db)
    const definitionService = new DefinitionService(definitionRepository)
    const definitionApi = new DefinitionApi(definitionService)

    const wotdRepository = new WotdRepository(db)
    const wotdService = new WotdService(wotdRepository)
    const wotdApi = new WotdApi(wotdService)

    const server = new Server(rhymeApi, thesaurusApi, definitionApi, wotdApi)
    server.setupRouting()
    server.startServer()
})