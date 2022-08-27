export interface FreePollOption<T> {
  /**
   * a function to request data from server
   */
  fetcher: () => Promise<T>;
  
  /**
   * decide when to request in next time. After several seconds, the fetcher will be used.
   * the first request will be send immediately.
   * @defaultValue 1000
   * @param response the response of last poll.
   */
  delay?: number | ((response: T) => number);

  /**
   * adjust whether to stop poll.
   * @defaultValue true
   * @param response the response
   */
  success?: (response : T) => boolean;
}

function resolveReq<T>(fetcher: () => Promise<T>, delay = 0): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetcher().then(resolve, reject);
    },delay)
  })
}

function isSuccess<T>(response: T, success?: (response: T) => boolean): boolean {
  return typeof success === 'function' ? success(response) : true;
}

function getDelay<T>(response: T, delay: number | ((response: T) => number )): number {
  return typeof delay === 'function' ? delay(response) : delay;
}

async function freePoll<T>(option: FreePollOption<T>): Promise<T> {
  const { fetcher, delay = 1000, success } = option;

  async function poll(fetcher: () => Promise<T>, response: T): Promise<T> {
    if(isSuccess(response, success)) {
      return response;
    }
    try {
      const newResponse =  await resolveReq(fetcher, getDelay(response, delay ));
      return poll(fetcher,newResponse);
    } catch (e) {
      console.error('Error when executing fetcher. Please check you request and response.')
      return response;
    }
  }

  const response = await fetcher();
  return poll(fetcher, response);
}

export { freePoll };