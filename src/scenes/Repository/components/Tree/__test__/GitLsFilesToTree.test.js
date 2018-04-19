import React from "react";
import { gitLsFilesToTree } from "../helpers/gitLsFilesToTree";

describe("gitLsFilesToTree", () => {
  describe("given an empty array", () => {
    it("results in an empty object", () => {
      expect(gitLsFilesToTree([])).toEqual({});
    });
  });

  describe("given some real-world data", () => {
    it("results in the correct tree data", () => {
      const input = [
        "bin/bash",
        "bin/sh",
        "usr/local/bin/true",
        "usr/local/bin/false",
        "usr/local/sbin/rabbitmq-defaults",
        "usr/local/sbin/rabbitmq-env",
        "usr/local/sbin/rabbitmq-plugins",
        "usr/local/sbin/rabbitmq-server",
        "usr/local/sbin/rabbitmqadmin",
        "usr/local/sbin/rabbitmqctl",
        "var/log/apache2/access.log",
        "var/log/apache2/error.log",
        "some file 1",
        "some file 2",
        "some file 3"
      ];
      expect(gitLsFilesToTree(input)).toMatchSnapshot();
    });
  });
});
