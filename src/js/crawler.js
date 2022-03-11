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

const http = require('http')

class Crawler {

    crawl(port) {
        // Execute the endpoints so swagger will display correct values
        // https://github.com/mpashkovskiy/express-oas-generator#how-to-use
        // Important! In order to get description of all parameters and JSON payloads
        // you have to start using your REST API or run REST API tests against it so
        // module can analyze requests/responses
        http.get({ port: port, path: "/rhymes?word=dove&page=2&size=10" })
        http.get({ port: port, path: "/thesaurus?word=hell&page=1&size=10" })
        http.get({ port: port, path: "/definitions?word=baffled&page=1&size=10" })
    }
}

module.exports = Crawler