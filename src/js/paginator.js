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

class Paginator {
    paginate(req, resultList) {
        // TODO: Check for malformed or too large paging parameters
        const pageNumber = parseInt(req.query.page || "1")
        const pageSize = parseInt(req.query.size || "10")
        const pagedList = resultList.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
        const hasPreviousPage = pageNumber > 1
        const hasNextPage = pageNumber < (resultList.length / pageSize)
        return {
            next: hasNextPage ? this._getPageUrl(req, pageNumber + 1) : undefined,
            previous: hasPreviousPage ? this._getPageUrl(req, pageNumber - 1) : undefined,
            count: pagedList.length,
            results: pagedList
        }
    }

    _getPageUrl(req, pageNumber) {
        // https://github.com/expressjs/express/issues/4697
        const completeUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
        const searchParams = new URLSearchParams(completeUrl)
        searchParams.set("page", pageNumber)
        const result = decodeURIComponent(searchParams.toString())
        return result
    }
}

module.exports = Paginator