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

const { Sequelize, DataTypes, Model } = require('sequelize')
const ThesaurusEntity = require('./thesaurusentity.js')
class ThesaurusRepository {

    constructor(sequelize) {
        this.model = sequelize.define('Thesaurus', {
            word: {
                type: DataTypes.STRING,
            },
            word_type: {
                type: DataTypes.STRING
            },
            synonyms: {
                type: DataTypes.STRING
            },
            antonyms: {
                type: DataTypes.STRING
            }
        }, {
            tableName: 'thesaurus'
        })
    }

    findAll = async (word) => (await this.model.findAll({
        attributes: ['word_type', 'synonyms', 'antonyms'],
        where: {
            word: word
        }
    })).map(value => new ThesaurusEntity(value.word_type, value.synonyms, value.antonyms))
}

module.exports = ThesaurusRepository