#!/bin/sh

# ------------------------------------------------------
# ---------- 【产品依赖包】 ------------------------------
# ------------------------------------------------------

# 以下均为须采用特定版本的【产品依赖包】。
# echo
# echo
# echo
# echo  -e  "\e[0;31m===== npm i    \e[97;41m特定版本\e[0;31m的【产品依赖包】 ============================\e[0m"
# echo
# 暂无。



# 以下均为可采用 latest 版本的【产品依赖包】。顺便提醒，虽然一般而言 latest 版本应恰为最高版本，但并不确保。
echo
echo
echo
echo  -e  "\e[0;31m===== npm i    特定版本的【产品依赖包】 ============================\e[0m"
echo
npm  i 'de-indent@latest'





# ------------------------------------------------------
# ---------- 【研发依赖包】 ------------------------------
# ------------------------------------------------------

# 以下均为须采用特定版本的【研发依赖包】。
# echo
# echo
# echo
# echo  -e  "\e[32m===== npm i    \e[90;102m特定版本\e[0;32m的【研发依赖包】 ============================\e[0m"
# echo
npm  i  -D \
    'vue@2'



# 以下均为可采用 latest 版本的【研发依赖包】。顺便提醒，虽然一般而言 latest 版本应恰为最高版本，但并不确保。
echo
echo
echo
echo  -e  "\e[32m===== npm i    特定版本的【研发依赖包】 ============================\e[0m"
echo
npm  i  -D \
    '@babel/core@latest' \
    '@babel/node@latest' \
    '@babel/preset-env@latest' \
    '@types/node@latest' \
    '@typescript-eslint/eslint-plugin@latest' \
    '@typescript-eslint/parser@latest' \
    '@vue/eslint-config-typescript@latest' \
    '@wulechuan/cli-scripts--git-push@latest' \
    '@wulechuan/css-stylus-markdown-themes@latest' \
    'eslint@latest' \
    'fs-extra@latest' \
    'typescript@latest' \
    'vue-property-decorator@latest'
