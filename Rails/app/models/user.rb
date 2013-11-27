class User < ActiveRecord::Base
	belongs_to :teacher, :dependent => :delete

	before_save { self.username = username.downcase }
	before_create :create_access_token
	
	has_secure_password

	def teacher?
		return self.teacher_id
	end

	def User.new_access_token
		return SecureRandom.urlsafe_base64
	end

	def User.encrypt(token)
		return Digest::SHA1.hexdigest(token.to_s)
	end

	private
		def create_access_token
			self.access_token = User.encrypt(User.new_access_token)
		end
end
