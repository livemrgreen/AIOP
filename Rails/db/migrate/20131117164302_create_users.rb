class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :access_token
      t.boolean :isAdmin
      t.integer :teacher_id

      t.timestamps
    end
  end
end
