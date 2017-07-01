import Dataloader from 'dataloader';

class DataloaderMock extends Dataloader {
  constructor(batchLoadFn, options) {
    super(batchLoadFn, options);
    // eslint-disable-next-line no-underscore-dangle
    this._batchLoadFn = ids =>
      Promise.resolve(
        ids.map(id => {
          if (typeof id === 'string') {
            return { slug: id };
          }
          return { id };
        })
      );
  }
}

export default DataloaderMock;
