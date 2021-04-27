export type DotNetFormatVersion =
  | "3"
  | "4"
;

const supportedVersions: DotNetFormatVersion[] = [
  "3",
  "4",
];

export function checkVersion(version: string): DotNetFormatVersion {
  for (let i = 0; i < supportedVersions.length; i++) {
    const ver = supportedVersions[i];
    if (ver === version) {
      return version;
    }
  }

  throw Error(`dotnet-format version "${version}" is unsupported`);
}
