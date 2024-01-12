#!/bin/bash

execute_login_request() {
    read -p "Enter username: " username
    read -p "Enter password: " password

    result=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"username\": \"$username\", \"password\": \"$password\"}" http://localhost:3000/api/users/login)

    jwt_token=$(echo "$result" | jq -r .token)
    echo "API Response:"
    bat --style=grid <<< "$result"
}

execute_register_request() {
    read -p "Enter username: " username
    read -p "Enter password: " password
    confirmPassword="$password"

    result=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"username\": \"$username\", \"password\": \"$password\", \"confirmPassword\": \"$confirmPassword\"}" http://localhost:3000/api/users/register)

    jwt_token=$(echo "$result" | jq -r .token)
    echo "API Response:"
    bat --style=grid <<< "$result"
}

execute_me_request() {
    if [ -z "$jwt_token" ]; then
        read -p "No JWT token found. Enter JWT token: " jwt_token
    else
        echo "Using the saved JWT token for authentication."
    fi

    result=$(curl -s -H "Authorization: Bearer $jwt_token" http://localhost:3000/api/users/me)
    echo "API Response:"
    bat --style=grid <<< "$result"
}

jwt_token=""

echo "Options:"
echo "1. /api/users/login POST"
echo "2. /api/users/register POST"
echo "3. /api/users/me GET"

read -p "Enter the number corresponding to your choice : " choice

while [ $choice -ne 12345 ]; do
    case $choice in
        1) execute_login_request;;
        2) execute_register_request;;
        3) execute_me_request;;
        *) echo "Invalid option";;
    esac

    read -p "Enter another number (12345 to exit): " choice
done

echo "Exiting the reponex_tester script"

