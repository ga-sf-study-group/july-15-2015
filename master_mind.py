from random import randint

# randomly generate solution that
# contains balls for the 4 slots
def generate_balls():
	colors = ['R', 'Y', 'G', 'B']
	balls = ""
	for i in range(4):
		balls += colors[randint(0,3)]
	return balls

# given the user's guess and solution,
# determine how many hits and psuedo hits earned
def find_hits(guess, solution):
	psuedo_hits = 0
	hits = 0

	# user guessed correctly!
	# return 4 hits
	if guess == solution:
		hits = 4
		return (hits, psuedo_hits)

	# determine the hits
	index = 0
	for element in guess:
		if element in solution and element == solution[index]:
			hits += 1
		elif element in solution:
			psuedo_hits += 1
		index += 1

	# return results
	return (hits, psuedo_hits)

def display_results(guess, solution):
	print "Solution is: ", solution
	print "Guess is: ", guess
	print "(hits, psuedo_hit):", find_hits(guess, solution)

# play the game until player exits
def play_game():
	while True:
		print 'Enter your guess or 0 to Exit'
		user_input = raw_input('> ')

		# exit condition
		if user_input == '0':
			break

		# generate solution and results
		solution_set = generate_balls()
		display_results(user_input, solution_set)

# run the program
play_game()