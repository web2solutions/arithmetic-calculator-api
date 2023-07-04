import https from 'https';
import { ServiceError } from '../infra/ServiceError';
import { IErrorData } from '../infra/interface/IErrorData';

const URL = 'https://www.random.org/strings/?num=1&len=8&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new';

export class RandomService {
  public static getRandom(): Promise<string> {
    return new Promise((resolve, reject) => {
      https.get(URL, (res) => {
        const data: Uint8Array[] = [];
        res.on('data', (chunk) => {
          data.push(chunk);
        });
        res.on('end', () => resolve(Buffer.concat(data).toString()));
      })
        .on('error', (err) => reject(new ServiceError(err as unknown as IErrorData)));
    });
  }
}
