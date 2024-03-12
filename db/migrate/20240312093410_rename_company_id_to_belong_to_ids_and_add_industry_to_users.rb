class RenameCompanyIdToBelongToIdsAndAddIndustryToUsers < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :company_id, :belong_to_ids
    add_column :users, :industry, :string
  end
end
