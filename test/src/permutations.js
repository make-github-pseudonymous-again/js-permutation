import test from 'ava';
import {increasing} from '@total-order/primitive';
import {fixedlexicographical} from '@total-order/lex';
import {isSorted} from '@comparison-sorting/is-sorted';
import {factorial} from '@combinatorics/factorial';
import {identity, next, permutations} from '../../src/index.js';

function macro(t, size) {
	const compare = fixedlexicographical(increasing, size);

	const pis = Array.from(permutations(size));

	t.is(pis.length, factorial(size), 'n! permutations');

	t.deepEqual(pis[0], identity(size), 'first permutation is id');

	t.deepEqual(next(pis[pis.length - 1]), identity(size), 'next(last) is id');

	t.true(
		isSorted(compare, pis, 0, pis.length),
		'permutations are in sorted order',
	);
}

macro.title = (_, size) => `permutations (${size})`;

for (let n = 0; n <= 6; ++n) test(macro, n);
