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
const DefinitionRepository = require("./src/js/repository/definitionrepository.js")
dbSetup.then((sequelize) => {
    const definitionrepository = new DefinitionRepository(sequelize)
    definitionrepository.findAll("hat").then((value) => {
        console.log(JSON.stringify(value))
    })
})
const server = new Server()
server.setupRouting()
server.startServer()