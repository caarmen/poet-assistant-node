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

// Port the java implementation of Random.nextInt() using a seed.
// This is so we have the same words of the day across the different platforms (android, iOS, ...)
// We also ported the java version to the iOS app:
// https://github.com/caarmen/poet-assistant-ios/blob/master/PoetAssistantLexiconsFramework/src/wotd/Random.swift
// One of the java implementations (for Android):
// https://android.googlesource.com/platform/libcore.git/+/refs/heads/marshmallow-mr3-release/luni/src/main/java/java/util/Random.java

class Random {
    constructor() {
        this._seed = 0
        this._multiplier = 0x5deece66d
    }

    setSeed(inputSeed) {
        this._seed = this._createSeed(inputSeed)
    }

    _createSeed(inputSeed) {
        return Number((BigInt(inputSeed) ^ BigInt(this._multiplier)) & ((1n << 48n) - 1n))
    }

    nextInt(upperBound) {
        if ((upperBound & -upperBound) == upperBound) return this._next(31)
        let bits = this._next(31)
        let val = bits % upperBound
        while (bits - val + (upperBound - 1) < 0) {
            bits = this._next(31)
            val = bits % upperBound
        }

        return val
    }

    _next(bits) {
        this._seed = Number((BigInt(this._seed) * BigInt(this._multiplier) + 0xbn) & ((1n << 48n) - 1n))
        return Number(BigInt(this._seed) >> (48n - BigInt(bits)))
    }
}

module.exports = Random