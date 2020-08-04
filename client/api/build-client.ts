import axios from "axios";
import { NextPageContext } from "next";

export const buildClient = (ctx: NextPageContext) => {
  const req = ctx?.req
  if (typeof window === "undefined" && req) {
    return axios.create({
      baseURL: `http://ingress-nginx-controller.kube-system.svc.cluster.local`,
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: "/",
    });
  }
};
