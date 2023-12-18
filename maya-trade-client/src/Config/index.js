const server = (payload) => {
  if (payload === "development") {
    return process.env.REACT_APP_devURL;
  } else {
    return process.env.REACT_APP_ProductionUrl;
  }
};

export const imageHostKey = process.env.REACT_APP_imgHostKey;
export const nod_Env = process.env.REACT_APP_Env;
export const serverUrl = server(nod_Env);
