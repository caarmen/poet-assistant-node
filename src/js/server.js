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

const { application } = require('express')
const express = require('express')
const Paginator = require("./paginator")
const Oas = require("./oas")

class Server {

    constructor(rhymeApi, thesaurusApi, definitionApi, wotdApi) {
        this.app = express()
        this.port = process.env.PORT || 3000
        this.oas = new Oas(this.app, this.port)
        this.oas.handleResponses()
        this.rhymeApi = rhymeApi
        this.thesaurusApi = thesaurusApi
        this.definitionApi = definitionApi
        this.wotdApi = wotdApi
        this.paginator = new Paginator()
    }

    setupRouting() {
        this.app.route("/rhymes")
            .get((req, res, next) => {
                this.rhymeApi.findAll(req.query.word).then((results) => {
                    res.send(JSON.stringify(this.paginator.paginate(req, results)))
                    next()
                })
            })
        this.app.route("/thesaurus")
            .get((req, res, next) => {
                this.thesaurusApi.findAll(req.query.word).then((results) => {
                    res.send(JSON.stringify(this.paginator.paginate(req, results)))
                    next()
                })
            })
        this.app.route("/definitions")
            .get((req, res, next) => {
                this.definitionApi.findAll(req.query.word).then((results) => {
                    res.send(JSON.stringify(this.paginator.paginate(req, results)))
                    next()
                })
            })
        this.app.route("/wotd")
            .get((req, res, next) => {
                this.wotdApi.findAll(req.query.before, req.query.size).then((results) => {
                    res.send(JSON.stringify(results))
                    next()
                })
            })
        this.oas.handleRequests()
    }

    startServer = () => {
        this.app.listen(this.port, () => {
            console.log(`Listening on http://localhost:${this.port}`)
            this.oas.crawl()
        })
    }
}

module.exports = Server