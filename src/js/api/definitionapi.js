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

const DefinitionApiModel = require("./definitionapimodel.js")
const PartOfSpeechApi = require("./partofspeechapi.js")

class DefinitionApi {
    constructor(service) {
        this.service = service
    }

    async findAll(word) {
        const results = await this.service.findAll(word)
        return results.map(value => new DefinitionApiModel(
            this._toPartOfSpeechApi(value.partOfSpeech),
            value.definition)
        )
    }

    _toPartOfSpeechApi = (partOfSpeechService) => {
        switch (partOfSpeechService) {
            case PartOfSpeechService.ADJECTIVE: return PartOfSpeechApi.ADJECTIVE
            case PartOfSpeechService.NOUN: return PartOfSpeechApi.NOUN
            case PartOfSpeechService.ADVERB: return PartOfSpeechApi.ADVERB
            case PartOfSpeechService.VERB: return PartOfSpeechApi.VERB
            default: return PartOfSpeechApi.UNKNOWN
        }
    }
}

module.exports = DefinitionApi