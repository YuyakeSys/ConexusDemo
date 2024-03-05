class RenameFullnameToFullNameInUsers < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :fullname, :full_name
  end
end
