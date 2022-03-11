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
const DefinitionEntity = require('./definitionentity.js')
class DefinitionRepository {

    constructor(sequelize) {
        this.model = sequelize.define('Definition', {
            word: {
                type: DataTypes.STRING,
            },
            part_of_speech: {
                type: DataTypes.CHAR
            },
            definition: {
                type: DataTypes.STRING
            }
        }, {
            tableName: 'dictionary'
        })
    }

    findAll(word) {
        return this.model.findAll({
            attributes: ['word', 'part_of_speech', 'definition'],
            where: {
                word: word
            }
        }).then((results) => {
            return results.map(value => new DefinitionEntity(value.word, value.part_of_speech, value.definition))
        })
    }
}

module.exports = DefinitionRepository