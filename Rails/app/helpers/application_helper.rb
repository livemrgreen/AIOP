module ApplicationHelper
	def current_user=(user)
		@current_user = user
	end

	def current_user
		access_token = User.encrypt(params[:access_token])
		@current_user ||= User.find_by(access_token: access_token)
	end

	def current_user?(user)
		return user == current_user
	end
end
