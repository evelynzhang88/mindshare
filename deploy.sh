#!/bin/bash
set -x
set -e

PRO_SRV='aliyun_wechat'
PRO_WWW='/mnt/acs_mnt/nas/WeChat002/websites/mindshare.e0x233.com'

rsync \
  --exclude=.DS_Store \
  --exclude=.git/ \
  --exclude=.gitignore \
  --exclude=.idea \
  --exclude=.vagrant \
  --exclude=*.box\
  --exclude=*.sql\
  --exclude=*.tgz\
  --exclude=*.zip\
  --exclude=deploy.sh \
  --exclude=docker/ \
  --exclude=node_modules/ \
  --delete \
  -arvP . $PRO_SRV:$PRO_WWW
