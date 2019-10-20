const anviz = require('node-anviz');
const yargs = require('yargs');

// TODO - change defaults with yours values

const argv = yargs
    .usage('$0 -a [address] -p [port] -i [id] -t [timeout]')
    .default({ a: '172.17.4.228', p: 5010, i: 2, t: 0 })
    .argv;

const request = new anviz.Request(argv.a, argv.p, argv.t);

// request.execute('getInformation1', argv.i)
//     .on('error', (err) => console.info('ERROR', err))
//     .on('complete', (res, raw) => {
//         console.info('res', res);
//         console.info('raw', raw);
//         request.close();
//     });

// request.execute('getRecordInformation', argv.i)
//     .on('error', (err) => console.info('ERROR', err))
//     .on('complete', (res, raw) => {
//         console.info('res', res);
//         console.info('raw', raw);
//         request.close();
//     });

// TODO - change usercode with yours value
request.execute('uploadRecord', argv.i, { usercode: 449, date: new Date() })
    .on('error', (err) => console.info('ERROR', err))
    .on('complete', (res, raw) => {
        console.info('res', res);
        console.info('raw', raw);
        request.close();
    });