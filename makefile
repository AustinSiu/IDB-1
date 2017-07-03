.DEFAULT_GOAL := all

ifeq ($(shell uname), Darwin)          # Apple
    PYTHON   := python3.5
    PIP      := pip3.5
    MYPY     := mypy
    PYLINT   := pylint
    COVERAGE := coverage
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
else ifeq ($(CI), true)                # Travis CI
    PYTHON   := python3.5
    PIP      := pip3.5
    MYPY     := mypy
    PYLINT   := pylint
    COVERAGE := coverage
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
else ifeq ($(shell uname -p), unknown) # Docker
    PYTHON   := python3.5
    PIP      := pip3.5
    MYPY     := mypy
    PYLINT   := pylint
    COVERAGE := coverage
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
else                                   # UTCS
    PYTHON   := python3
    PIP      := pip3
    MYPY     := mypy
    PYLINT   := pylint3
    COVERAGE := coverage
    PYDOC    := pydoc3.5
    AUTOPEP8 := autopep8
endif

.pylintrc:
	$(PYLINT) --disable=locally-disabled --reports=no --generate-rcfile > $@

collatz-tests:
	git clone https://github.com/cs373t-summer-2017/collatz-tests.git

Collatz.html: Collatz.py
	pydoc3 -w Collatz

Collatz.log:
	git log > Collatz.log

RunCollatz.tmp: Collatz.py RunCollatz.py .pylintrc
	-$(MYPY) Collatz.py
	-$(PYLINT) Collatz.py
	-$(MYPY) RunCollatz.py
	-$(PYLINT) RunCollatz.py
	$(PYTHON) RunCollatz.py < RunCollatz.in > RunCollatz.tmp
	-diff RunCollatz.tmp RunCollatz.out

tests.out: tests.py .pylintrc
	-$(MYPY) tests.py
	-$(PYLINT) tests.py
	-$(COVERAGE) run    --branch tests.py >  tests.out 2>&1
	-$(COVERAGE) report -m                      >> tests.out
	cat tests.out

all:

check:
	@not_found=0;                                 \
    for i in $(FILES);                            \
    do                                            \
        if [ -e $$i ];                            \
        then                                      \
            echo "$$i found";                     \
        else                                      \
            echo "$$i NOT FOUND";                 \
            not_found=`expr "$$not_found" + "1"`; \
        fi                                        \
    done;                                         \
    if [ $$not_found -ne 0 ];                     \
    then                                          \
        echo "$$not_found failures";              \
        exit 1;                                   \
    fi;                                           \
    echo "success";

clean:
	rm -f  .coverage
	rm -f  *.pyc
	# rm -f  RunCollatz.tmp
	# rm -f  TestCollatz.tmp
	rm -rf __pycache__

config:
	git config -l

format:
	$(AUTOPEP8) -i tests.py
	# $(AUTOPEP8) -i RunCollatz.py
	# $(AUTOPEP8) -i TestCollatz.py

scrub:
	make clean
	rm -f  .pylintrc
	rm -f  Collatz.html
	rm -f  Collatz.log

status:
	make clean
	@echo
	git branch
	git remote -v
	git status

test:
	-$(COVERAGE) run    --branch tests.py >  tests.out 2>&1
	cat tests.out

versions:
	which cmake
	cmake --version
	@echo
	which make
	make --version
	@echo
	which git
	git --version
	@echo
	which $(PYTHON)
	$(PYTHON) --version
	@echo
	which $(PIP)
	$(PIP) --version
	@echo
	which $(MYPY)
	$(MYPY) --version
	@echo
	which $(PYLINT)
	$(PYLINT) --version
	@echo
	which $(COVERAGE)
	$(COVERAGE) --version
	@echo
	-which $(PYDOC)
	-$(PYDOC) --version
	@echo
	which $(AUTOPEP8)
	$(AUTOPEP8) --version
	@echo
	$(PIP) list
