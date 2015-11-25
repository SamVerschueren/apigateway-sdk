import test from 'ava';
import sinon from 'sinon';
import AWS from 'aws-sdk';
import fn from './';

const gateway = {
	getSdk: (params, cb) => {
		if (params.restApiId === 'foo' && params.stageName === 'v1') {
			setImmediate(() => {
				cb(undefined);
			});

			return {
				response: {
					httpResponse: {
						body: new Buffer('bar')
					}
				}
			};
		}

		cb(new Error('something went wrong'));
	}
};

test.before(t => {
	sinon.stub(AWS, 'APIGateway').returns(gateway);
	sinon.spy(gateway, 'getSdk');
	t.end();
});

test.after(t => {
	AWS.APIGateway.restore();
	t.end();
});

test('throw error if id is not provided', async t => {
	await t.throws(fn({}), 'Please provide the API id.');
});

test('throw error if stage is not provided', async t => {
	await t.throws(fn({id: 'foo'}), 'Please provide the stage name.');
});

test('error', async t => {
	await t.throws(fn({id: 'foo', stage: 'v2'}), 'something went wrong');
});

test.serial('params', async t => {
	await fn({id: 'foo', stage: 'v1'});

	t.same(gateway.getSdk.args[0][0], {
		restApiId: 'foo',
		stageName: 'v1',
		sdkType: 'javascript'
	});
});

test('result', async t => {
	t.same(await fn({id: 'foo', stage: 'v1'}), new Buffer('bar'));
});
