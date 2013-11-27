class TeachersController < ApplicationController
	def index
		teachers = Teacher.all
		if teachers
			render json: teachers, status: 200
		else
			render json: nil, status: 400
		end
	end

	def show
		teacher = Teacher.find(params[:id])
		if teacher
			render json: teacher, status: 200
		else
			render json: nil, status: 400
		end
	end

	def reservations
		teacher = Teacher.find(params[:id])
		teachings = teacher.teachings
		reservations = []
		teachings.each {
			|current_teaching|
			reservations.push current_teaching.reservation
		}
		reservations.compact!
		render json: reservations.as_json(include: [:time_slot, :room, 
			{teaching: {include: [:group, :teacher,
				{lesson: {include: [:subject, :lesson_type]}}]}}]),
				root: "reservations", status: 200
	end

	def reservation_requests
		teacher = Teacher.find(params[:id])
		if teacher
			teachings = teacher.teachings
			if teachings
				requests = []
				teachings.each {
					|current_teaching|
					requests |= current_teaching.reservation_requests
				}
				requests = requests.select {
					|current_request|
					current_request.status == nil && current_request.reservation_id == nil
				}
				render json: requests.as_json(include: [:reservation, :time_slot,
					{teaching: {include: [:teacher,
									{lesson: {include: [:lesson_type, :subject]}},
									:group]}}]),
						root: "reservation_requests", status: 200
			else
				render json: nil, status: 400
			end
		else
			render json: nil, status: 400
		end
	end

	def available_reservation_requests
		teacher = Teacher.find(params[:id])
		modules = teacher.modules
		subjects = []
		modules.each {
			|current_module|
			subjects |= current_module.subjects
		}
		lessons = []
		subjects.each {
			|current_subject|
			lessons |= current_subject.lessons
		}
		teachings = []
		lessons.each {
			|current_lesson|
			teachings |= current_lesson.teachings
		}
		requests = []
		teachings.each {
			|current_teaching|
			requests |= current_teaching.reservation_requests
		}
		requests = requests.select {
			|current_request|
			current_request.status == nil && current_request.reservation_id == nil
		}
		render json: requests.as_json(include: [:teaching, :reservation]),
						root: "reservation_requests", status: 200
	end
end
