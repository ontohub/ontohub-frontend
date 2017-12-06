import React from "react";
import { mount, render } from "enzyme";
import GitLsFilesToTree from "../GitLsFilesToTree";
import { DirectoryTree } from "..";

describe("DirectoryTree", () => {
  const component = (
    <DirectoryTree
      tree={GitLsFilesToTree([
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
        "file.txt",
        "file.pdf",
        "file.bat",
        "file.bmp",
        "file.bpg",
        "file.exif",
        "file.gif",
        "file.heif",
        "file.jfif",
        "file.jpeg",
        "file.jpeg2000",
        "file.jpg",
        "file.pbm",
        "file.pgm",
        "file.png",
        "file.pnm",
        "file.ppm",
        "file.svg",
        "file.tiff",
        "file.webp",
        "file.3gp",
        "file.asf",
        "file.avi",
        "file.flv",
        "file.gifv",
        "file.mkv",
        "file.mov",
        "file.mp4",
        "file.mpeg",
        "file.mpg",
        "file.mwv",
        "file.qt",
        "file.ts",
        "file.vob",
        "file.webm",
        "file.aac",
        "file.flac",
        "file.mp3",
        "file.ogg",
        "file.wav",
        "file.doc",
        "file.docx",
        "file.xls",
        "file.xlsx",
        "file.ppt",
        "file.pptx",
        "file.7z",
        "file.bz2",
        "file.gz",
        "file.rar",
        "file.tar",
        "file.xz",
        "file.zip",
        "file.casl",
        "file.dol",
        "file.hascasl",
        "file.het",
        "file.owl",
        "file.omn",
        "file.obo",
        "file.hs",
        "file.exp",
        "file.maude",
        "file.elf",
        "file.hol",
        "file.isa",
        "file.thy",
        "file.prf",
        "file.omdoc",
        "file.hpf",
        "file.clf",
        "file.clif",
        "file.xml",
        "file.fcstd",
        "file.rdf",
        "file.xmi",
        "file.qvt",
        "file.p",
        "file.tptp",
        "file.gen_trm",
        "file.baf",
        "untyped file 1",
        "untyped file 2",
        "untyped file 3"
      ])}
      initiallyOpenNodes={["usr", "usr/local/bin"]}
    />
  );

  it("matches the snapshot", () => {
    const wrapper = render(component);
    expect(wrapper).toMatchSnapshot();
  });

  describe("after clicking on a directory opener", () => {
    const wrapper = mount(component);
    wrapper
      .find('Icon[data-type="inner-node-opener"][data-path="usr/local"]')
      .simulate("click");

    it("matches the snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe("after clicking on a directory closer", () => {
      wrapper
        .find('Icon[data-type="inner-node-opener"][data-path="usr"]')
        .simulate("click");

      it("matches the snapshot", () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
