# versionate
Update the software version in multiple files with different formats.
Allows you to work with version numbers with any number of fragments, for example `1.2.3.4.5`.

## Install
`npm i -g @turquoise-dragonfly/versionate`

## Usage
```
$> versionate init
$> versionate set 1.0.0-1
$> versionate show
Current version: 1.0.0-1

$> versiontate bump prerelease
$> versionate show
Current version: 1.0.0-2

$> versionate bump MINOR
$> versionate show
Current version: 1.1.0
```

## Commands
### Init project
Initialize a project by creating an empty `.versionate` file.

`versionate init`

### Track files
Adds a file containing a version to manage to the project.
XML, JSON, TypeScript and properties files are supported.

`versionate track path type location`
 - `path` The path of the file to add
 - `type ` The file format: xml, json, ts or properties
 - `location` The location of the version number in the file content

### Untrack files
Delete a file from the project so that it is no longer managed.

`versionate untrack path`

### Show current version
Shows the current version of the managed files.

`versionate show`

**Example:**
```
$> versionate show
Current version: 1.0.0
```

In case of inconsistency between the versions of the files, it will be displayed.
```
$> versionate show
Files do not have the version number synchronized!!
Consider using the set command to synchronize versions across all files.
Versions found:
  * 0.0.1 (2 files)
  * 0.2.1 (1 files)
```
The verbose option will offer more precise information.
```
$> versionate show -v
Files do not have the version number synchronized!!
Consider using the set command to synchronize versions across all files.
Versions found:
  * 0.0.1 (2 files)
  * 0.2.1 (1 files)
Details:
  * 0.0.1 (plugin-package.properties)
  * 0.0.1 (version.pvd.xml)
  * 0.2.1 (environment.prod.ts)
```

### Set a fixed version
Establishes the indicated version in all managed files.

`versionate set version`

**Example:**
```
$> versionate show
Current version: 1.0.0

$> versionate set 1.2.3

$> versionate show
Current version: 1.2.3
```

### Increment a version fragment
Raises the indicated chunk of the version, setting the chunks to its right to 0.

`versionate bump fragment`

 - `fragment` The fragment to increase.
   - `MAJOR` The first chunk
   - `MINOR` The second chunk
   - `PATCH` The third chunk
   - `prerelease` The prerelease version
   - `<number>` Number indicating the position of the fragment to be incremented, starting at 1.

Example:
```
$> versionate show
Current version: 1.0.0

$> versionate bump MINOR
$> versionate show
Current version: 1.1.0

$> versionate bump PATCH
$> versionate show
Current version: 1.1.1

$> versionate bump prerelease
$> versionate show
Current version: 1.1.1-1

$> versionate bump 2
$> versionate show
Current version: 1.2.0
```