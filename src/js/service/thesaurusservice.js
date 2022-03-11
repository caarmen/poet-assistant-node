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

const ThesaurusEntryServiceModel = require("./thesaurusentryservicemodel.js")
const PartOfSpeechService = require("./partofspeechservice.js")

class ThesaurusService {
    constructor(repository) {
        this.repository = repository
    }

    findAll = async (word) => (await this.repository.findAll(word))
        .map(value =>
            new ThesaurusEntryServiceModel(
                this._toPartOfSpeechService(value.partOfSpeech),
                this._toList(value.synonyms),
                this._toList(value.antonyms),
            )
        )

    _toList = (csvString) => csvString.split(",").filter(item => item != "").sort()

    _toPartOfSpeechService = (partOfSpeechString) => {
        switch (partOfSpeechString) {
            case 'ADJ': return PartOfSpeechService.ADJECTIVE
            case 'NOUN': return PartOfSpeechService.NOUN
            case 'ADV': return PartOfSpeechService.ADVERB
            case 'VERB': return PartOfSpeechService.VERB
            default: return PartOfSpeechService.UNKNOWN
        }
    }
}

module.exports = ThesaurusService