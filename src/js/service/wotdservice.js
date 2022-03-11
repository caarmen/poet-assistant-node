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

const WotdServiceModel = require("./wotdservicemodel.js")
const Rand = require("./random.js")

// When looking up random words, their "frequency" is a factor in the selection.
// Words which are too frequent (a, the, why) are not interesting words.
// Words which are too rare (aalto) are likely not interesting either.

// Note: we want the words with frequency between 1500 and 25000 exclusive, to
// return the same values as in the android/ios implementations.
const _MIN_INTERESTING_FREQUENCY = 1501
const _MAX_INTERESTING_FREQUENCY = 24999

class WotdService {
    constructor(repository) {
        this.repository = repository
    }

    async findAll(beforeDateString, pageSize) {
        const beforeDate = beforeDateString? Date.parse(beforeDateString) : this._getTodayMidnight()
        const result = []
        for (let datePosition = 0; datePosition < (pageSize || 1); datePosition++) {
            const dateMillis = this._getDateMillis(beforeDate, datePosition)
            const word = await this._getWotd(dateMillis)
            const date = new Date(dateMillis)
            result.push(new WotdServiceModel(date, word))
        }
        return result
    }

    _getTodayMidnight() {
        const date = new Date()
        date.setUTCHours(0)
        date.setUTCMinutes(0)
        date.setUTCSeconds(0)
        date.setUTCMilliseconds(0)
        return date
    }
    async _getWotd(dateMillis) {
        const interestingStemWords = await this.repository.findAll(_MIN_INTERESTING_FREQUENCY, _MAX_INTERESTING_FREQUENCY)
        const dbPosition = this._getDbPositionForDate(dateMillis, interestingStemWords.length)
        return interestingStemWords[dbPosition]
    }

    _getDbPositionForDate(dateMillis, dbSize) {
        const rand = new Rand()
        rand.setSeed(dateMillis)
        return rand.nextInt(dbSize)
    }

    _getDateMillis(inputDateMidnight, daysBefore) {
        const targetDateMidnight = new Date(inputDateMidnight)
        targetDateMidnight.setUTCDate(targetDateMidnight.getUTCDate() - daysBefore)
        return targetDateMidnight
    }

}

module.exports = WotdService