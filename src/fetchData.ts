const getSuspender = (promise: Promise<any>) => {
    let status = "pending";
    let response: any;
  
    const suspender = promise.then(
      (res: any) => {
        status = "success";
        response = res;
      },
      (err: any) => {
        status = "error";
        response = err;
      }
    );
  
    const read = () => {
      switch (status) {
        case "pending":
          throw suspender;
        case "error":
          throw response;
        default:
          return response;
      }
    };
  
    return { read };
  };
  
  export function fetchData(url: RequestInfo | URL) {
    const promise = fetch(url)
      .then((response) => response.json())
      .then((json) => json);
  
    return getSuspender(promise);
  }
  