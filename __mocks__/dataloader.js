import Dataloader from 'dataloader';

class DataloaderMock extends Dataloader {
  constructor(batchLoadFn, options) {
    super(batchLoadFn, options);
    // eslint-disable-next-line no-underscore-dangle
    this._batchLoadFn = ids => Promise.resolve(ids.map(id => ({ id })));
  }
}

export default DataloaderMock;
