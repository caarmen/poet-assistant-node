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

const { Sequelize, DataTypes, Model, QueryTypes } = require('sequelize')
const RhymeEntity = require('./rhymeentity.js')
class RhymeRepository {

    _subqueryTemplate = `
        SELECT
          source_word_variants.rowid,
          '{syllables_type}' AS syllables_type,
          source_word_variants.{syllables_type} AS syllables,
          '{syllables_sort_key}' AS syllables_type_sort_key,
          source_word_variants.variant_number,
          rhymes_word_variants.word AS rhyming_word,
          rhymes_word_variants.has_definition
        FROM
          word_variants AS source_word_variants
          JOIN word_variants AS rhymes_word_variants ON syllables = rhymes_word_variants.{syllables_type}
          AND source_word_variants.word != rhyming_word
        WHERE
          rhymes_word_variants.has_definition = 1
          AND source_word_variants.word = $word
    `
    _unionTemplate = `
        UNION
    `
    _orderByTemplate = `
        ORDER BY
            syllables_type_sort_key,
            source_word_variants.variant_number,
            rhymes_word_variants.word
    `
    constructor(sequelize) {
        this.sequelize = sequelize
    }

    _createSubqueryTemplate = (syllablesType, syllablesSortKey) => this._subqueryTemplate
        .replaceAll("{syllables_type}", syllablesType)
        .replaceAll("{syllables_sort_key}", syllablesSortKey)

    async findAll(word) {
        const subQueries = [
            this._createSubqueryTemplate('stress_syllables', '1'),
            this._createSubqueryTemplate('last_three_syllables', '2'),
            this._createSubqueryTemplate('last_two_syllables', '3'),
            this._createSubqueryTemplate('last_syllable', '4'),
        ]
        const fullQuery = subQueries.join(this._unionTemplate) + this._orderByTemplate

        const results = await this.sequelize.query(fullQuery, {
            bind: { 'word': word },
            type: QueryTypes.SELECT
        })
        return results.map(value => new RhymeEntity(value.syllables_type, value.syllables, value.rhyming_word))
    }
}

module.exports = RhymeRepository