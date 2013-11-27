namespace :db do
	desc "Fill database with sample data"
	task populate: :environment do
		make_teachers
		make_users
		make_buildings
		make_characteristics
		make_time_slots
		make_groups
		make_lesson_types
		make_mods
		make_subjects
		make_lessons
		make_teachings
		make_rooms
		make_characteristics_rooms
		make_reservation_requests
	end
end

def make_teachers
	Teacher.create(first_name: "Anne", last_name: "Laurent")
	Teacher.create(first_name: "Bernard", last_name: "Fallery")
	Teacher.create(first_name: "Isabelle", last_name: "Bourdon")
	Teacher.create(first_name: "Lysianne", last_name: "Buisson")
	Teacher.create(first_name: "Michèle", last_name: "Cart")
	Teacher.create(first_name: "Jacques", last_name: "Ruiz")
	Teacher.create(first_name: "Thomas", last_name: "Izard")
	Teacher.create(first_name: "Esther", last_name: "Pacitti")
	Teacher.create(first_name: "Corinne", last_name: "Seguin")
	Teacher.create(first_name: "Anne-Laure", last_name: "De Lauzun")
	Teacher.create(first_name: "Tiberiu", last_name: "Stratulat")
	Teacher.create(first_name: "Michel", last_name: "Sala")
	Teacher.create(first_name: "Marc", last_name: "Dumas")
end

def make_users
	User.create(username: "annelaurent",
				password: "annelaurent", password_confirmation: "annelaurent",
				isAdmin: false, teacher_id: 1)
	User.create(username: "bernardfallery",
				password: "bernardfallery", password_confirmation: "bernardfallery",
				isAdmin: false, teacher_id: 2)
	User.create(username: "isabellebourdon",
				password: "isabellebourdon", password_confirmation: "isabellebourdon",
				isAdmin: false, teacher_id: 3)
	User.create(username: "lysiannebuisson",
				password: "lysiannebuisson", password_confirmation: "lysiannebuisson",
				isAdmin: false, teacher_id: 4)
	User.create(username: "michelecart",
				password: "michelecart", password_confirmation: "michelecart",
				isAdmin: false, teacher_id: 5)
	User.create(username: "jacquesruiz",
				password: "jacquesruiz", password_confirmation: "jacquesruiz",
				isAdmin: false, teacher_id: 6)
	User.create(username: "thomasizard",
				password: "thomasizard", password_confirmation: "thomasizard",
				isAdmin: false, teacher_id: 7)
	User.create(username: "estherpacitti",
				password: "estherpacitti", password_confirmation: "estherpacitti",
				isAdmin: false, teacher_id: 8)
	User.create(username: "corinneseguin",
				password: "corinneseguin", password_confirmation: "corinneseguin",
				isAdmin: false, teacher_id: 9)
	User.create(username: "annelauredelauzun",
				password: "annelauredelauzun", password_confirmation: "annelauredelauzun",
				isAdmin: false, teacher_id: 10)
	User.create(username: "tiberiustratulat",
				password: "tiberiustratulat", password_confirmation: "tiberiustratulat",
				isAdmin: false, teacher_id: 11)
	User.create(username: "michelsala",
				password: "michelsala", password_confirmation: "michelsala",
				isAdmin: false, teacher_id: nil)
	User.create(username: "marcdumas",
				password: "marcdumas", password_confirmation: "marcdumas",
				isAdmin: false, teacher_id: 13)
	admin = User.create(username: "admin", teacher_id: nil, isAdmin: true,
						password: "admin", password_confirmation: "admin")
end

def make_buildings
	Building.create(label: "Polytech")
end

def make_characteristics
	Characteristic.create(label: "Projecteur")
	Characteristic.create(label: "Amphithéâtre")
	Characteristic.create(label: "Prises")
	Characteristic.create(label: "Micro")
	Characteristic.create(label: "TP")
end

def make_time_slots
	TimeSlot.create(start: "8:00:00", end:"9:30:00")
	TimeSlot.create(start: "9:45:00", end:"11:15:00")
	TimeSlot.create(start: "11:30:00", end:"13:00:00")
	TimeSlot.create(start: "14:00:00", end:"15:30:00")
	TimeSlot.create(start: "15:45:00", end:"17:15:00")
end

def make_groups
	Group.create(label: "IG4", parent_id: nil)
	Group.create(label: "IG4 TP1", parent_id: 1)
	Group.create(label: "IG4 TP2", parent_id: 1)
	Group.create(label: "IG4 G1 ANG", parent_id: 1)
	Group.create(label: "IG4 G2 ANG", parent_id: 1)
	Group.create(label: "IG4 G3 ANG", parent_id: 1)
end

def make_lesson_types
	LessonType.create(label: "CM")
	LessonType.create(label: "TD")
	LessonType.create(label: "TP")
end

def make_mods
	Mod.create(label: "Conception de Bases de Données", teacher_id: 1)
	Mod.create(label: "Système et Réseaux", teacher_id: 4)
	Mod.create(label: "Entreprendre et Agir", teacher_id: 2)
	Mod.create(label: "Entrepreneuriale", teacher_id: 3)
	Mod.create(label: "Langues et Communication", teacher_id: 5)
end

def make_subjects
	Subject.create(label: "Conception par Objet", module_id: 1)
	Subject.create(label: "Bases de Données Relationnelles Objet", module_id: 1)
	Subject.create(label: "Système d'Exploitation", module_id: 2)
	Subject.create(label: "Réseaux", module_id: 2)
	Subject.create(label: "Simulation d'Entreprise", module_id: 3)
	Subject.create(label: "Si et Marketing", module_id: 3)
	Subject.create(label: "Management des Systèmes d'Information", module_id: 3)
	Subject.create(label: "Techniques de Gestion de Projets.", module_id: 4)
	Subject.create(label: "Méthodologie de Gestion de Projets", module_id: 4)
	Subject.create(label: "Anglais", module_id: 5)
	Subject.create(label: "Insertion Professionnelle", module_id: 5)
	Subject.create(label: "Communication", module_id: 5)
end

def make_lessons
	Lesson.create(label: "Cours 1", lesson_type_id: 1, subject_id: 1)
	Lesson.create(label: "Cours 2", lesson_type_id: 2, subject_id: 1)
	Lesson.create(label: "Cours 3", lesson_type_id: 3, subject_id: 1)
	Lesson.create(label: "Cours 1", lesson_type_id: 1, subject_id: 2)
	Lesson.create(label: "Cours 2", lesson_type_id: 2, subject_id: 2)
	Lesson.create(label: "Cours 3", lesson_type_id: 3, subject_id: 2)
	Lesson.create(label: "Cours 1", lesson_type_id: 1, subject_id: 3)
	Lesson.create(label: "Cours 2", lesson_type_id: 2, subject_id: 3)
	Lesson.create(label: "Cours 3", lesson_type_id: 3, subject_id: 3)
	Lesson.create(label: "Cours 1", lesson_type_id: 1, subject_id: 4)
	Lesson.create(label: "Cours 2", lesson_type_id: 2, subject_id: 4)
	Lesson.create(label: "Cours 3", lesson_type_id: 3, subject_id: 4)
	Lesson.create(label: "Cours 1", lesson_type_id: 1, subject_id: 5)
	Lesson.create(label: "Cours 2", lesson_type_id: 2, subject_id: 5)
	Lesson.create(label: "Cours 3", lesson_type_id: 3, subject_id: 5)
	Lesson.create(label: "Cours 1", lesson_type_id: 1, subject_id: 6)
	Lesson.create(label: "Cours 2", lesson_type_id: 2, subject_id: 6)
	Lesson.create(label: "Cours 3", lesson_type_id: 3, subject_id: 6)
	Lesson.create(label: "Cours 1", lesson_type_id: 1, subject_id: 7)
	Lesson.create(label: "Cours 2", lesson_type_id: 2, subject_id: 7)
	Lesson.create(label: "Cours 3", lesson_type_id: 3, subject_id: 7)
	Lesson.create(label: "Cours 1", lesson_type_id: 1, subject_id: 8)
	Lesson.create(label: "Cours 2", lesson_type_id: 2, subject_id: 8)
	Lesson.create(label: "Cours 3", lesson_type_id: 3, subject_id: 8)
	Lesson.create(label: "Cours 1", lesson_type_id: 1, subject_id: 9)
	Lesson.create(label: "Cours 2", lesson_type_id: 2, subject_id: 9)
	Lesson.create(label: "Cours 3", lesson_type_id: 3, subject_id: 9)
	Lesson.create(label: "Cours 1", lesson_type_id: 1, subject_id: 10)
	Lesson.create(label: "Cours 2", lesson_type_id: 2, subject_id: 10)
	Lesson.create(label: "Cours 3", lesson_type_id: 3, subject_id: 10)
	Lesson.create(label: "Cours 1", lesson_type_id: 1, subject_id: 11)
	Lesson.create(label: "Cours 2", lesson_type_id: 2, subject_id: 11)
	Lesson.create(label: "Cours 3", lesson_type_id: 3, subject_id: 11)
	Lesson.create(label: "Cours 1", lesson_type_id: 1, subject_id: 12)
	Lesson.create(label: "Cours 2", lesson_type_id: 2, subject_id: 12)
	Lesson.create(label: "Cours 3", lesson_type_id: 3, subject_id: 12)
end

def make_teachings
	Teaching.create(group_id: 6, lesson_id: 36, teacher_id: 13)
	Teaching.create(group_id: 4, lesson_id: 2, teacher_id: 12)
	Teaching.create(group_id: 5, lesson_id: 3, teacher_id: 11)
	Teaching.create(group_id: 1, lesson_id: 7, teacher_id: 10)
	Teaching.create(group_id: 2, lesson_id: 33, teacher_id: 9)
	Teaching.create(group_id: 3, lesson_id: 30, teacher_id: 1)
	Teaching.create(group_id: 5, lesson_id: 1, teacher_id: 4)
	Teaching.create(group_id: 1, lesson_id: 4, teacher_id: 3)
	Teaching.create(group_id: 2, lesson_id: 5, teacher_id: 13)
	Teaching.create(group_id: 3, lesson_id: 6, teacher_id: 2)
	Teaching.create(group_id: 6, lesson_id: 8, teacher_id: 1)
	Teaching.create(group_id: 3, lesson_id: 9, teacher_id: 13)
	Teaching.create(group_id: 4, lesson_id: 13, teacher_id: 7)
	Teaching.create(group_id: 1, lesson_id: 12, teacher_id: 8)
	Teaching.create(group_id: 1, lesson_id: 17, teacher_id: 5)
	Teaching.create(group_id: 4, lesson_id: 16, teacher_id: 9)
	Teaching.create(group_id: 5, lesson_id: 11, teacher_id: 10)
	Teaching.create(group_id: 6, lesson_id: 15, teacher_id: 12)
	Teaching.create(group_id: 2, lesson_id: 19, teacher_id: 13)
	Teaching.create(group_id: 6, lesson_id: 18, teacher_id: 11)
	Teaching.create(group_id: 1, lesson_id: 21, teacher_id: 10)
	Teaching.create(group_id: 3, lesson_id: 20, teacher_id: 8)
	Teaching.create(group_id: 4, lesson_id: 14, teacher_id: 9)
	Teaching.create(group_id: 1, lesson_id: 22, teacher_id: 4)
	Teaching.create(group_id: 1, lesson_id: 23, teacher_id: 3)
	Teaching.create(group_id: 2, lesson_id: 25, teacher_id: 1)
	Teaching.create(group_id: 5, lesson_id: 26, teacher_id: 2)
	Teaching.create(group_id: 5, lesson_id: 32, teacher_id: 5)
	Teaching.create(group_id: 1, lesson_id: 31, teacher_id: 12)
	Teaching.create(group_id: 6, lesson_id: 29, teacher_id: 13)
	Teaching.create(group_id: 3, lesson_id: 28, teacher_id: 3)
	Teaching.create(group_id: 6, lesson_id: 27, teacher_id: 7)
	Teaching.create(group_id: 4, lesson_id: 34, teacher_id: 2)
	Teaching.create(group_id: 6, lesson_id: 35, teacher_id: 3)
	Teaching.create(group_id: 3, lesson_id: 10, teacher_id: 13)
	Teaching.create(group_id: 3, lesson_id: 24, teacher_id: 13)
end

def make_rooms
	Room.create(label: "Amphithéâtre", capacity: 200, building_id: 1)
	Room.create(label: "SC001", capacity: 100, building_id: 1)
	Room.create(label: "SC002", capacity: 100, building_id: 1)
	Room.create(label: "SC003", capacity: 50, building_id: 1)
	Room.create(label: "SC004", capacity: 50, building_id: 1)
	Room.create(label: "TP1", capacity: 20, building_id: 1)
	Room.create(label: "TP2", capacity: 20, building_id: 1)
	Room.create(label: "TP3", capacity: 20, building_id: 1)
	Room.create(label: "TP4", capacity: 20, building_id: 1)
	Room.create(label: "TP5", capacity: 10, building_id: 1)
	Room.create(label: "SC101", capacity: 50, building_id: 1)
	Room.create(label: "SC102", capacity: 50, building_id: 1)
	Room.create(label: "SC201", capacity: 50, building_id: 1)
	Room.create(label: "SC202", capacity: 50, building_id: 1)
end

def make_characteristics_rooms
	room = Room.find_by(id: 1)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 1)
	characteristic = Characteristic.find_by(id: 2)
	room.characteristics << characteristic
	room = Room.find_by(id: 2)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 2)
	characteristic = Characteristic.find_by(id: 2)
	room.characteristics << characteristic
	room = Room.find_by(id: 3)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 3)
	characteristic = Characteristic.find_by(id: 3)
	room.characteristics << characteristic
	room = Room.find_by(id: 4)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 4)
	characteristic = Characteristic.find_by(id: 3)
	room.characteristics << characteristic
	room = Room.find_by(id: 5)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 5)
	characteristic = Characteristic.find_by(id: 3)
	room.characteristics << characteristic
	room = Room.find_by(id: 6)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 6)
	characteristic = Characteristic.find_by(id: 4)
	room.characteristics << characteristic
	room = Room.find_by(id: 6)
	characteristic = Characteristic.find_by(id: 5)
	room.characteristics << characteristic
	room = Room.find_by(id: 7)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 7)
	characteristic = Characteristic.find_by(id: 4)
	room.characteristics << characteristic
	room = Room.find_by(id: 7)
	characteristic = Characteristic.find_by(id: 5)
	room.characteristics << characteristic
	room = Room.find_by(id: 8)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 8)
	characteristic = Characteristic.find_by(id: 4)
	room.characteristics << characteristic
	room = Room.find_by(id: 8)
	characteristic = Characteristic.find_by(id: 5)
	room.characteristics << characteristic
	room = Room.find_by(id: 9)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 9)
	characteristic = Characteristic.find_by(id: 4)
	room.characteristics << characteristic
	room = Room.find_by(id: 9)
	characteristic = Characteristic.find_by(id: 5)
	room.characteristics << characteristic
	room = Room.find_by(id: 10)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 10)
	characteristic = Characteristic.find_by(id: 4)
	room.characteristics << characteristic
	room = Room.find_by(id: 10)
	characteristic = Characteristic.find_by(id: 5)
	room.characteristics << characteristic
	room = Room.find_by(id: 11)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 11)
	characteristic = Characteristic.find_by(id: 3)
	room.characteristics << characteristic
	room = Room.find_by(id: 12)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 12)
	characteristic = Characteristic.find_by(id: 3)
	room.characteristics << characteristic
	room = Room.find_by(id: 13)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 13)
	characteristic = Characteristic.find_by(id: 3)
	room.characteristics << characteristic
	room = Room.find_by(id: 14)
	characteristic = Characteristic.find_by(id: 1)
	room.characteristics << characteristic
	room = Room.find_by(id: 14)
	characteristic = Characteristic.find_by(id: 3)
	room.characteristics << characteristic
end

def make_reservation_requests
	statuses = ["-1", "-2", nil]
	15.times do |n|
		ReservationRequest.create(date: Time.now, teaching_id: Random.rand(1..36),
									time_slot_id: Random.rand(1..5), status: statuses.sample)
	end
end
