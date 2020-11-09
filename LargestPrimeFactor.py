'''
     - 작성자: 이호섭
     - 소  속: 강원대학교
     - 작성일: 2020년 11월 8일
     - 기  능:
            input:  Node.js로 부터 0이상 1000000이하의 자연수를 입력받아
            output: 수인수 분해에 사용된 소수들과
                    가장 큰 소인수와
                    프로그램 수행시간을 반환한다.
'''

import timeit
import sys


##
#   name:   mkPrimeList
#   type:   mathod
#   input:  int number
#   output: list
#   role:   number 이하의 소수들을 담은 리스트 primeNumbers 를 반환한다.
def mkPrimeList(number):
    primeNumbers = []           # number 이하의 소수들을 담을 list
    primeBoolean = [False, False] + [True] * (number - 1)       # 소수 판별을 위한 Boolean list

    # 아리스토테네스의 채, 소인수 분해에 사용하기 위해 sqt(number)는 사용하지 않는다.
    for i in range(2, number + 1):
        if primeBoolean[i]:
            primeNumbers.append(i)
            for j in range(2 * i, number + 1, i):
                primeBoolean[j] = False

    return primeNumbers


##
#   name:   factorization
#   type:   mathod
#   input:  int number
#   output: list
#   role:   number를 소인수분해한 뒤 list fac 으로 반환한다.
def factorization(number):
    factor = []        # number의 소인수들을 담을 list

    primeNumbers = mkPrimeList(number)      # 소수가 아닌 수들은 분해가 가능하기 때문에 소수만 사용한다.

    for primeNumber in primeNumbers:
        while number % primeNumber == 0:
            factor.append(primeNumber)
            number //= primeNumber
        if number == 1:
            break

    return factor


##
#   name:   main
#   type:   mathod
#   input:  none
#   output: none
#   role:   main
def main():
    number = sys.argv[1]    # node.js's input

    if not number.isdigit():
        print('Please input a number')
        print('Not a number')
        print(False)
        return 0

    number = int(number)

    if number == 0 or number == 1:
        print('Please input a number[2-1000000]')
        print('This number that cannot be prime factorized.')
        print(False)
        return 0
    elif number < 0 or number > 1000000:
        print('Please input a number[2-1000000]')
        print('Out of range')
        print(False)
        return 0

    start = timeit.default_timer()
    fac = factorization(number)
    end = timeit.default_timer()

    runTime = end - start

    print(fac)
    print(fac[-1])   # 가장 마지막의 값은 무조건 max이다
    print(True)


if __name__ == '__main__':
    main()
