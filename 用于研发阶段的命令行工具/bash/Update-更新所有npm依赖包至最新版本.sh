#!/bin/sh

# -------------------------------------------------------
#           特定版本之【产品依赖包】
# -------------------------------------------------------

echo

echo  -e  "\e[0;31m===== npm i    \e[97;41m特定版本\e[0;31m之【产品依赖包】 ============================\e[0m"

echo

echo '暂无。'





# -------------------------------------------------------
#          最末版本之【产品依赖包】
# - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# 顺便提醒，虽然一般而言 latest 版本应恰为最高版本，但并不确保。
# -------------------------------------------------------

echo
echo
echo
echo
echo

echo  -e  "\e[0;31m===== npm i    最末版本之【产品依赖包】 ============================\e[0m"

echo

npm  i 'de-indent@latest'





# -------------------------------------------------------
#           特定版本之【研发依赖包】
# -------------------------------------------------------

echo
echo
echo
echo
echo

echo  -e  "\e[32m===== npm i    \e[90;102m特定版本\e[0;32m之【研发依赖包】 ============================\e[0m"

echo

npm  i  -D \
    'vue@2'





# -------------------------------------------------------
#          最末版本之【研发依赖包】
# - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# 顺便提醒，虽然一般而言 latest 版本应恰为最高版本，但并不确保。
# -------------------------------------------------------

echo
echo
echo
echo
echo

echo  -e  "\e[32m===== npm i    最末版本之【研发依赖包】 ============================\e[0m"

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





# -------------------------------------------------------
#           结束
# -------------------------------------------------------

echo
echo
echo
echo
echo
