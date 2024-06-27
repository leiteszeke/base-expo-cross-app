<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <br />
  <a href="https://leites.dev" target="_blank">
    <img src="https://picsum.photos/150/150" alt="" />
  </a>
  <br />
  <h1 align="center">Cross Platform Example App</h1>
</p>

## Requisites

- [React Native Environment](https://reactnative.dev/docs/environment-setup)
- [Cocoapods](https://guides.cocoapods.org/using/getting-started.html)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Expo](https://expo.dev)

## Project Setup

```sh
# Install npm dependencies
yarn install

# Install pods
cd ios && pod install && cd ..

# Install gem dependencies
bundle install

# Create local.properties file and ask for credentials and keystore
cp android/local.properties.example android/local.properties
```

## Caveats (OS X)

Avoid using the default version that comes with OSX which have permissions issues:

```bash
# install rbenv with brew to manage ruby versions
brew install rbenv

# Add these lines to your ~/.bash_profile or ~/.zshrc in order to start rbenv in each terminal session
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

# install ruby 3.1.2 (or latest)
rbenv install 3.1.2

# set ruby version to 3.1.2
rbenv global 3.1.2

# check ruby version is properly installed and set
ruby --version
ruby 3.1.2p20 (2022-04-12 revision 4491bb740a) [arm64-darwin21]

# install cocoapods with new ruby version
gem install cocoapods
```

---

# [Fastlane](https://docs.fastlane.tools/) - [How to prepare the project?](./fastlane-README.md)

## Signing

1. Check that you have SSH access to the [keystore repository](https://gitlab.cookunity.com/apps/cu-chefs-keystore)
2. Run

```sh
# Fastlane match for appstore certificates (just for production environment)
bundle exec fastlane certificates type:"appstore"
```

and

```sh
# Fastlane match for development certificates (just for Dev and QA environments)
bundle exec fastlane certificates type:"development"
```

> You will be prompt to set a `MATCH_PASSWORD` and a `KEYCHAIN_PASSWORD`.\
> Ask your Team Lead or one Team mate for `MATCH_PASSWORD`\
> The `KEYCHAIN_PASSWORD` is your computer password\

---

## Apple Profile / Certification Info

Apple Profile Types:

- adhoc - this profile is used later in the development process, when you want to distribute your app to a small group of testers that are not included in the iOS developer program for your organization
- development - allows you to distribute your app to other registered developers
- appstore - allows you to upload your app to TestFlight and the App Store

Apple Certificate Types:

- development — use app services during development and testing, on your computer or a connected device
- distribution — sign an app before distributing it through the App Store

If you get an error when signing, you may need to remove the invalid certificate file from the [keystore repo](https://gitlab.cookunity.com/apps/cu-chefs-keystore/-/tree/development/).

## Build

```sh
# Build command
bundle exec fastlane {{ lane }}

# Available generic lanes
certificates  Generate iOS certificates

# Available lanes
ios dev       Build iOS ExampleApp scheme using Debug build config
ios prod      Build iOS ExampleApp scheme using Release build config
android dev   Build Android debug build type
android prod  Build Android release build type

# Available CI lanes
ios ci_dev       Runs ios dev and upload binary file to App Distribution
ios ci_prod      Runs ios prod and upload binary file to App Store Connect
android ci_dev   Runs android dev and upload binary file to App Distribution
android ci_prod  Runs android prod and upload binary file to Play Store Console
```

## Maestro

```bash
# Install Maestro
curl -Ls "https://get.maestro.mobile.dev" | bash

# Install iOS dependencies
brew tap facebook/fb
brew install facebook/fb/idb-companion
```

## Detox

```bash
# Install iOS Dependencies
brew tap wix/brew
brew install applesimutils
```
