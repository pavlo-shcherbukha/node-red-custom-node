@echo off
call ..\login.cmd
oc project %APP_PROJ%
pause

set fltempl=app-srvc-templ.yaml 
set fldepl=user-reg-srvc-depl.yaml 


set APP_SERVICE_NAME=user-reg-srvc
set APP_NAME=node-red-test
set GIT_BRANCH=master
set GIT_URL=https://github.com/pavlo-shcherbukha/node-red-in-openshift.git
set DOCKER_PTH=./Dockerfile
set NODE_RED_FLOW=./user-registration.json 

oc delete -f %fldepl%
pause
oc process -f %fltempl%  --param=NAMESPACE=%APP_PROJ%  --param=APP_SERVICE_NAME=%APP_SERVICE_NAME% --param=APP_NAME=%APP_NAME% --param=GIT_BRANCH=%GIT_BRANCH% --param=GIT_URL=%GIT_URL% --param=DOCKER_PTH=%DOCKER_PTH% --param=NODE_RED_FLOW=%NODE_RED_FLOW% -o yaml > %fldepl% 
pause
oc create -f %fldepl%
pause
 